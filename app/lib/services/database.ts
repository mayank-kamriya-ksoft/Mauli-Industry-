import { getSupabaseClient } from "../supabase";
import { getPool } from "../db";
import type { ProductCategory, Client, CompanyInfo, Page } from "../db";
import { DatabaseError, NotFoundError } from "../api/errors";

// Enhanced database service that uses Supabase when available, falls back to PostgreSQL pool
export class DatabaseService {
  private supabase = getSupabaseClient();
  private pool = getPool();

  // Products
  async getProducts(): Promise<ProductCategory[]> {
    const { productCategories: staticProducts } = await import("~/data/products");

    if (this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          return (data || []).map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description || "",
            image_url: p.image_url || "",
            created_at: p.created_at,
          }));
        }
      } catch (error) {
        console.error("Error fetching products from Supabase:", error);
      }
    }

    if (this.pool) {
      try {
        const result = await this.pool.query<ProductCategory>(
          "SELECT * FROM products ORDER BY created_at ASC"
        );
        if (result.rows.length > 0) {
          return result.rows;
        }
      } catch (error) {
        console.error("Error fetching products from pool:", error);
      }
    }

    return staticProducts.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      image_url: p.imageUrl,
    }));
  }

  async getProduct(id: string): Promise<ProductCategory | null> {
    if (this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          if (error.code === "PGRST116") throw new NotFoundError("Product", id);
          throw new DatabaseError(error.message, error);
        }

        if (!data) throw new NotFoundError("Product", id);

        return {
          id: data.id,
          name: data.name,
          description: data.description || "",
          image_url: data.image_url || "",
          created_at: data.created_at,
        };
      } catch (error) {
        if (error instanceof NotFoundError || error instanceof DatabaseError) throw error;
        console.error("Error fetching product from Supabase:", error);
      }
    }

    // Fallback to pool
    if (this.pool) {
      try {
        const result = await this.pool.query<ProductCategory>(
          "SELECT * FROM products WHERE id = $1",
          [id]
        );
        if (result.rows.length === 0) throw new NotFoundError("Product", id);
        return result.rows[0];
      } catch (error) {
        if (error instanceof NotFoundError) throw error;
        console.error("Error fetching product from pool:", error);
      }
    }

    throw new NotFoundError("Product", id);
  }

  async createProduct(product: Omit<ProductCategory, "created_at">): Promise<ProductCategory> {
    if (this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from("products")
          .insert({
            id: product.id,
            name: product.name,
            description: product.description || null,
            image_url: product.image_url || null,
          })
          .select()
          .single();

        if (error) throw new DatabaseError(error.message, error);
        if (!data) throw new DatabaseError("Failed to create product");

        return {
          id: data.id,
          name: data.name,
          description: data.description || "",
          image_url: data.image_url || "",
          created_at: data.created_at,
        };
      } catch (error) {
        if (error instanceof DatabaseError) throw error;
        throw new DatabaseError("Failed to create product", error);
      }
    }

    // Fallback to pool
    if (this.pool) {
      try {
        const result = await this.pool.query<ProductCategory>(
          "INSERT INTO products (id, name, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
          [product.id, product.name, product.description, product.image_url]
        );
        return result.rows[0];
      } catch (error) {
        throw new DatabaseError("Failed to create product", error);
      }
    }

    throw new DatabaseError("Database not available");
  }

  async updateProduct(id: string, updates: Partial<ProductCategory>): Promise<ProductCategory> {
    if (this.supabase) {
      try {
        const updateData: any = {};
        if (updates.name !== undefined) updateData.name = updates.name;
        if (updates.description !== undefined) updateData.description = updates.description;
        if (updates.image_url !== undefined) updateData.image_url = updates.image_url;

        const { data, error } = await this.supabase
          .from("products")
          .update(updateData)
          .eq("id", id)
          .select()
          .single();

        if (error) {
          if (error.code === "PGRST116") throw new NotFoundError("Product", id);
          throw new DatabaseError(error.message, error);
        }

        if (!data) throw new NotFoundError("Product", id);

        return {
          id: data.id,
          name: data.name,
          description: data.description || "",
          image_url: data.image_url || "",
          created_at: data.created_at,
        };
      } catch (error) {
        if (error instanceof NotFoundError || error instanceof DatabaseError) throw error;
        throw new DatabaseError("Failed to update product", error);
      }
    }

    // Fallback to pool
    if (this.pool) {
      try {
        const result = await this.pool.query<ProductCategory>(
          "UPDATE products SET name = COALESCE($2, name), description = COALESCE($3, description), image_url = COALESCE($4, image_url) WHERE id = $1 RETURNING *",
          [id, updates.name, updates.description, updates.image_url]
        );
        if (result.rows.length === 0) throw new NotFoundError("Product", id);
        return result.rows[0];
      } catch (error) {
        if (error instanceof NotFoundError) throw error;
        throw new DatabaseError("Failed to update product", error);
      }
    }

    throw new DatabaseError("Database not available");
  }

  async deleteProduct(id: string): Promise<void> {
    if (this.supabase) {
      const { error } = await this.supabase.from("products").delete().eq("id", id);
      if (error) {
        if (error.code === "PGRST116") throw new NotFoundError("Product", id);
        throw new DatabaseError(error.message, error);
      }
      return;
    }

    if (this.pool) {
      const result = await this.pool.query("DELETE FROM products WHERE id = $1", [id]);
      if (result.rowCount === 0) throw new NotFoundError("Product", id);
      return;
    }

    throw new DatabaseError("Database not available");
  }

  // Clients
  async getClients(): Promise<Client[]> {
    const { clients: staticClients } = await import("~/data/clients");

    if (this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from("clients")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          return (data || []).map((c) => ({
            id: c.id,
            name: c.name,
            logo_url: c.logo_url || "",
            logoUrl: c.logo_url || "",
            created_at: c.created_at,
          }));
        }
      } catch (error) {
        console.error("Error fetching clients from Supabase:", error);
      }
    }

    if (this.pool) {
      try {
        const result = await this.pool.query<Client>("SELECT * FROM clients ORDER BY created_at ASC");
        if (result.rows.length > 0) {
          return result.rows.map(c => ({
            ...c,
            logoUrl: c.logo_url || (c as any).logoUrl
          }));
        }
      } catch (error) {
        console.error("Error fetching clients from pool:", error);
      }
    }

    return staticClients.map((c) => ({
      id: c.id,
      name: c.name,
      logo_url: c.logoUrl,
      logoUrl: c.logoUrl,
    }));
  }

  async getClient(id: string): Promise<Client | null> {
    if (this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from("clients")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          if (error.code === "PGRST116") throw new NotFoundError("Client", id);
          throw new DatabaseError(error.message, error);
        }

        if (!data) throw new NotFoundError("Client", id);

        return {
          id: data.id,
          name: data.name,
          logo_url: data.logo_url || "",
          created_at: data.created_at,
        };
      } catch (error) {
        if (error instanceof NotFoundError || error instanceof DatabaseError) throw error;
        console.error("Error fetching client from Supabase:", error);
      }
    }

    if (this.pool) {
      try {
        const result = await this.pool.query<Client>("SELECT * FROM clients WHERE id = $1", [id]);
        if (result.rows.length === 0) throw new NotFoundError("Client", id);
        return result.rows[0];
      } catch (error) {
        if (error instanceof NotFoundError) throw error;
        console.error("Error fetching client from pool:", error);
      }
    }

    throw new NotFoundError("Client", id);
  }

  async createClient(client: Omit<Client, "created_at">): Promise<Client> {
    if (this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from("clients")
          .insert({
            id: client.id,
            name: client.name,
            logo_url: client.logo_url || null,
          })
          .select()
          .single();

        if (error) throw new DatabaseError(error.message, error);
        if (!data) throw new DatabaseError("Failed to create client");

        return {
          id: data.id,
          name: data.name,
          logo_url: data.logo_url || "",
          created_at: data.created_at,
        };
      } catch (error) {
        if (error instanceof DatabaseError) throw error;
        throw new DatabaseError("Failed to create client", error);
      }
    }

    if (this.pool) {
      try {
        const result = await this.pool.query<Client>(
          "INSERT INTO clients (id, name, logo_url) VALUES ($1, $2, $3) RETURNING *",
          [client.id, client.name, client.logo_url]
        );
        return result.rows[0];
      } catch (error) {
        throw new DatabaseError("Failed to create client", error);
      }
    }

    throw new DatabaseError("Database not available");
  }

  async updateClient(id: string, updates: Partial<Client>): Promise<Client> {
    if (this.supabase) {
      try {
        const updateData: any = {};
        if (updates.name !== undefined) updateData.name = updates.name;
        if (updates.logo_url !== undefined) updateData.logo_url = updates.logo_url;

        const { data, error } = await this.supabase
          .from("clients")
          .update(updateData)
          .eq("id", id)
          .select()
          .single();

        if (error) {
          if (error.code === "PGRST116") throw new NotFoundError("Client", id);
          throw new DatabaseError(error.message, error);
        }

        if (!data) throw new NotFoundError("Client", id);

        return {
          id: data.id,
          name: data.name,
          logo_url: data.logo_url || "",
          created_at: data.created_at,
        };
      } catch (error) {
        if (error instanceof NotFoundError || error instanceof DatabaseError) throw error;
        throw new DatabaseError("Failed to update client", error);
      }
    }

    if (this.pool) {
      try {
        const result = await this.pool.query<Client>(
          "UPDATE clients SET name = COALESCE($2, name), logo_url = COALESCE($3, logo_url) WHERE id = $1 RETURNING *",
          [id, updates.name, updates.logo_url]
        );
        if (result.rows.length === 0) throw new NotFoundError("Client", id);
        return result.rows[0];
      } catch (error) {
        if (error instanceof NotFoundError) throw error;
        throw new DatabaseError("Failed to update client", error);
      }
    }

    throw new DatabaseError("Database not available");
  }

  async deleteClient(id: string): Promise<void> {
    if (this.supabase) {
      const { error } = await this.supabase.from("clients").delete().eq("id", id);
      if (error) {
        if (error.code === "PGRST116") throw new NotFoundError("Client", id);
        throw new DatabaseError(error.message, error);
      }
      return;
    }

    if (this.pool) {
      const result = await this.pool.query("DELETE FROM clients WHERE id = $1", [id]);
      if (result.rowCount === 0) throw new NotFoundError("Client", id);
      return;
    }

    throw new DatabaseError("Database not available");
  }

  // Company Info
  async getCompanyInfo(): Promise<CompanyInfo> {
    if (this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from("company_info")
          .select("*")
          .eq("id", "default")
          .single();

        if (error) {
          if (error.code === "PGRST116") {
            // Return fallback if not found
            return this.getFallbackCompanyInfo();
          }
          throw new DatabaseError(error.message, error);
        }

        if (!data) return this.getFallbackCompanyInfo();

        return {
          id: data.id,
          name: data.name,
          tagline: data.tagline || "",
          description: data.description || "",
          address_line1: data.address_line1 || "",
          address_line2: data.address_line2 || "",
          address_country: data.address_country || "",
          phone: data.phone || "",
          email: data.email || "",
          website: data.website || "",
          profile_brief: data.profile_brief || "",
          profile_mission: data.profile_mission || "",
          profile_vision: data.profile_vision || "",
          profile_history: data.profile_history || "",
          certifications: data.certifications || [],
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
      } catch (error) {
        if (error instanceof DatabaseError) throw error;
        console.error("Error fetching company info from Supabase:", error);
        return this.getFallbackCompanyInfo();
      }
    }

    if (this.pool) {
      try {
        const result = await this.pool.query<CompanyInfo>(
          "SELECT * FROM company_info WHERE id = 'default'"
        );
        if (result.rows.length === 0) return this.getFallbackCompanyInfo();
        return result.rows[0];
      } catch (error) {
        console.error("Error fetching company info from pool:", error);
        return this.getFallbackCompanyInfo();
      }
    }

    return this.getFallbackCompanyInfo();
  }

  private async getFallbackCompanyInfo(): Promise<CompanyInfo> {
    const { companyInfo } = await import("~/data/company");
    return {
      id: "default",
      name: companyInfo.name,
      tagline: companyInfo.tagline,
      description: companyInfo.description,
      address_line1: companyInfo.address.line1,
      address_line2: companyInfo.address.line2,
      address_country: companyInfo.address.country,
      phone: companyInfo.contact.phone,
      email: companyInfo.contact.email,
      website: companyInfo.contact.website,
      profile_brief: companyInfo.profile.brief,
      profile_mission: companyInfo.profile.mission,
      profile_vision: companyInfo.profile.vision,
      profile_history: companyInfo.profile.history,
      certifications: companyInfo.certifications,
    };
  }

  async updateCompanyInfo(updates: Partial<CompanyInfo>): Promise<CompanyInfo> {
    if (this.supabase) {
      try {
        const updateData: any = {};
        Object.keys(updates).forEach((key) => {
          if (key !== "id" && updates[key as keyof CompanyInfo] !== undefined) {
            updateData[key] = updates[key as keyof CompanyInfo];
          }
        });
        updateData.updated_at = new Date().toISOString();

        const { data, error } = await this.supabase
          .from("company_info")
          .update(updateData)
          .eq("id", "default")
          .select()
          .single();

        if (error) throw new DatabaseError(error.message, error);
        if (!data) throw new DatabaseError("Failed to update company info");

        return {
          id: data.id,
          name: data.name,
          tagline: data.tagline || "",
          description: data.description || "",
          address_line1: data.address_line1 || "",
          address_line2: data.address_line2 || "",
          address_country: data.address_country || "",
          phone: data.phone || "",
          email: data.email || "",
          website: data.website || "",
          profile_brief: data.profile_brief || "",
          profile_mission: data.profile_mission || "",
          profile_vision: data.profile_vision || "",
          profile_history: data.profile_history || "",
          certifications: data.certifications || [],
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
      } catch (error) {
        if (error instanceof DatabaseError) throw error;
        throw new DatabaseError("Failed to update company info", error);
      }
    }

    if (this.pool) {
      try {
        const result = await this.pool.query<CompanyInfo>(
          `UPDATE company_info SET 
            name = COALESCE($1, name),
            tagline = COALESCE($2, tagline),
            description = COALESCE($3, description),
            address_line1 = COALESCE($4, address_line1),
            address_line2 = COALESCE($5, address_line2),
            address_country = COALESCE($6, address_country),
            phone = COALESCE($7, phone),
            email = COALESCE($8, email),
            website = COALESCE($9, website),
            profile_brief = COALESCE($10, profile_brief),
            profile_mission = COALESCE($11, profile_mission),
            profile_vision = COALESCE($12, profile_vision),
            profile_history = COALESCE($13, profile_history),
            certifications = COALESCE($14, certifications),
            updated_at = NOW()
          WHERE id = 'default' RETURNING *`,
          [
            updates.name,
            updates.tagline,
            updates.description,
            updates.address_line1,
            updates.address_line2,
            updates.address_country,
            updates.phone,
            updates.email,
            updates.website,
            updates.profile_brief,
            updates.profile_mission,
            updates.profile_vision,
            updates.profile_history,
            updates.certifications,
          ]
        );
        return result.rows[0];
      } catch (error) {
        throw new DatabaseError("Failed to update company info", error);
      }
    }

    throw new DatabaseError("Database not available");
  }

  // Pages
  async getPages(): Promise<Page[]> {
    if (this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from("pages")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        return (data || []).map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          content: p.content || "",
          status: (p.status as "draft" | "published") || "draft",
          author: p.author || "",
          featured_image: p.featured_image || undefined,
          excerpt: p.excerpt || undefined,
          created_at: p.created_at,
          updated_at: p.updated_at,
        }));
      } catch (error) {
        console.error("Error fetching pages from Supabase:", error);
        return [];
      }
    }

    if (this.pool) {
      try {
        const result = await this.pool.query<Page>("SELECT * FROM pages ORDER BY created_at DESC");
        return result.rows;
      } catch (error) {
        console.error("Error fetching pages from pool:", error);
        return [];
      }
    }

    return [];
  }

  async getPage(id: string): Promise<Page | null> {
    if (this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from("pages")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          if (error.code === "PGRST116") throw new NotFoundError("Page", id);
          throw new DatabaseError(error.message, error);
        }

        if (!data) throw new NotFoundError("Page", id);

        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          content: data.content || "",
          status: (data.status as "draft" | "published") || "draft",
          author: data.author || "",
          featured_image: data.featured_image || undefined,
          excerpt: data.excerpt || undefined,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
      } catch (error) {
        if (error instanceof NotFoundError || error instanceof DatabaseError) throw error;
        console.error("Error fetching page from Supabase:", error);
      }
    }

    if (this.pool) {
      try {
        const result = await this.pool.query<Page>("SELECT * FROM pages WHERE id = $1", [id]);
        if (result.rows.length === 0) throw new NotFoundError("Page", id);
        return result.rows[0];
      } catch (error) {
        if (error instanceof NotFoundError) throw error;
        console.error("Error fetching page from pool:", error);
      }
    }

    throw new NotFoundError("Page", id);
  }

  async getPageBySlug(slug: string): Promise<Page | null> {
    if (this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from("pages")
          .select("*")
          .eq("slug", slug)
          .eq("status", "published")
          .maybeSingle();

        if (error) throw new DatabaseError(error.message, error);
        if (!data) return null;

        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          content: data.content || "",
          status: (data.status as "draft" | "published") || "draft",
          author: data.author || "",
          featured_image: data.featured_image || undefined,
          excerpt: data.excerpt || undefined,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
      } catch (error) {
        if (error instanceof DatabaseError) throw error;
        console.error("Error fetching page by slug from Supabase:", error);
      }
    }

    if (this.pool) {
      try {
        const result = await this.pool.query<Page>(
          "SELECT * FROM pages WHERE slug = $1 AND status = 'published'",
          [slug]
        );
        if (result.rows.length === 0) return null;
        return result.rows[0];
      } catch (error) {
        console.error("Error fetching page by slug from pool:", error);
      }
    }

    return null;
  }

  async createPage(page: Omit<Page, "created_at" | "updated_at">): Promise<Page> {
    if (this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from("pages")
          .insert({
            id: page.id,
            title: page.title,
            slug: page.slug,
            content: page.content || null,
            status: page.status || "draft",
            author: page.author || null,
            featured_image: page.featured_image || null,
            excerpt: page.excerpt || null,
          })
          .select()
          .single();

        if (error) throw new DatabaseError(error.message, error);
        if (!data) throw new DatabaseError("Failed to create page");

        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          content: data.content || "",
          status: (data.status as "draft" | "published") || "draft",
          author: data.author || "",
          featured_image: data.featured_image || undefined,
          excerpt: data.excerpt || undefined,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
      } catch (error) {
        if (error instanceof DatabaseError) throw error;
        throw new DatabaseError("Failed to create page", error);
      }
    }

    if (this.pool) {
      try {
        const result = await this.pool.query<Page>(
          "INSERT INTO pages (id, title, slug, content, status, author, featured_image, excerpt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
          [
            page.id,
            page.title,
            page.slug,
            page.content,
            page.status,
            page.author,
            page.featured_image,
            page.excerpt,
          ]
        );
        return result.rows[0];
      } catch (error) {
        throw new DatabaseError("Failed to create page", error);
      }
    }

    throw new DatabaseError("Database not available");
  }

  async updatePage(id: string, updates: Partial<Page>): Promise<Page> {
    if (this.supabase) {
      try {
        const updateData: any = {};
        if (updates.title !== undefined) updateData.title = updates.title;
        if (updates.slug !== undefined) updateData.slug = updates.slug;
        if (updates.content !== undefined) updateData.content = updates.content;
        if (updates.status !== undefined) updateData.status = updates.status;
        if (updates.author !== undefined) updateData.author = updates.author;
        if (updates.featured_image !== undefined) updateData.featured_image = updates.featured_image;
        if (updates.excerpt !== undefined) updateData.excerpt = updates.excerpt;
        updateData.updated_at = new Date().toISOString();

        const { data, error } = await this.supabase
          .from("pages")
          .update(updateData)
          .eq("id", id)
          .select()
          .single();

        if (error) {
          if (error.code === "PGRST116") throw new NotFoundError("Page", id);
          throw new DatabaseError(error.message, error);
        }

        if (!data) throw new NotFoundError("Page", id);

        return {
          id: data.id,
          title: data.title,
          slug: data.slug,
          content: data.content || "",
          status: (data.status as "draft" | "published") || "draft",
          author: data.author || "",
          featured_image: data.featured_image || undefined,
          excerpt: data.excerpt || undefined,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
      } catch (error) {
        if (error instanceof NotFoundError || error instanceof DatabaseError) throw error;
        throw new DatabaseError("Failed to update page", error);
      }
    }

    if (this.pool) {
      try {
        const result = await this.pool.query<Page>(
          `UPDATE pages SET 
            title = COALESCE($2, title),
            slug = COALESCE($3, slug),
            content = COALESCE($4, content),
            status = COALESCE($5, status),
            author = COALESCE($6, author),
            featured_image = COALESCE($7, featured_image),
            excerpt = COALESCE($8, excerpt),
            updated_at = NOW()
          WHERE id = $1 RETURNING *`,
          [
            id,
            updates.title,
            updates.slug,
            updates.content,
            updates.status,
            updates.author,
            updates.featured_image,
            updates.excerpt,
          ]
        );
        if (result.rows.length === 0) throw new NotFoundError("Page", id);
        return result.rows[0];
      } catch (error) {
        if (error instanceof NotFoundError) throw error;
        throw new DatabaseError("Failed to update page", error);
      }
    }

    throw new DatabaseError("Database not available");
  }

  async deletePage(id: string): Promise<void> {
    if (this.supabase) {
      const { error } = await this.supabase.from("pages").delete().eq("id", id);
      if (error) {
        if (error.code === "PGRST116") throw new NotFoundError("Page", id);
        throw new DatabaseError(error.message, error);
      }
      return;
    }

    if (this.pool) {
      const result = await this.pool.query("DELETE FROM pages WHERE id = $1", [id]);
      if (result.rowCount === 0) throw new NotFoundError("Page", id);
      return;
    }

    throw new DatabaseError("Database not available");
  }
}

// Singleton instance
export const dbService = new DatabaseService();


