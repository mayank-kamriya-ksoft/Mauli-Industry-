import type { ActionFunctionArgs } from "react-router";

// POST /api/upload - Upload image to Cloudinary
export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return Response.json({ success: false, error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return Response.json({ success: false, error: "Invalid file type. Allowed: JPG, PNG, WEBP, GIF, SVG" }, { status: 400 });
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return Response.json({ success: false, error: "File too large. Maximum 10MB." }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return Response.json({ success: false, error: "Cloudinary not configured" }, { status: 500 });
    }

    // Generate signature for signed upload
    const timestamp = Math.round(Date.now() / 1000).toString();
    const folder = (formData.get("folder") as string) || "mauli-cms";
    
    // Create signature string
    const signatureStr = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    
    // Generate SHA-1 signature
    const encoder = new TextEncoder();
    const data = encoder.encode(signatureStr);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    // Upload to Cloudinary
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("api_key", apiKey);
    uploadFormData.append("timestamp", timestamp);
    uploadFormData.append("signature", signature);
    uploadFormData.append("folder", folder);

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: uploadFormData }
    );

    const result = await cloudinaryRes.json();

    if (!cloudinaryRes.ok) {
      console.error("Cloudinary upload error:", result);
      return Response.json(
        { success: false, error: result.error?.message || "Upload failed" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
