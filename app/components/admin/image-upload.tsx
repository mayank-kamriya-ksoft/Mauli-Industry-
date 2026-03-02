import { useState, useRef, useCallback } from "react";
import { Upload, X } from "lucide-react";
import styles from "./image-upload.module.css";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export function ImageUpload({ value, onChange, folder = "mauli-cms", label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (file: File) => {
    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await res.json();

      if (result.success) {
        onChange(result.data.url);
      } else {
        setError(result.error || "Upload failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }, [folder, onChange]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  }, [handleUpload]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  if (uploading) {
    return (
      <div className={styles.container}>
        {label && <label>{label}</label>}
        <div className={styles.uploading}>
          <div className={styles.spinner} />
          <p className={styles.uploadingText}>Uploading to Cloudinary...</p>
        </div>
      </div>
    );
  }

  if (value) {
    return (
      <div className={styles.container}>
        {label && <label>{label}</label>}
        <div className={styles.preview}>
          <img src={value} alt="Uploaded" className={styles.previewImage} />
          <div className={styles.previewInfo}>
            <p className={styles.previewUrl}>{value}</p>
          </div>
          <div className={styles.previewActions}>
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => onChange("")}
              title="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        {/* Allow re-upload */}
        <button
          type="button"
          className={styles.dropzone}
          onClick={() => fileInputRef.current?.click()}
          style={{ minHeight: "60px", padding: "var(--space-3)" }}
        >
          <p className={styles.dropzoneText}>
            <span className={styles.browseLink}>Click to replace image</span>
          </p>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className={styles.fileInput}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}
      <div
        className={`${styles.dropzone} ${dragging ? styles.dropzoneDragging : ""}`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload size={32} className={styles.dropzoneIcon} />
        <p className={styles.dropzoneText}>
          Drag & drop an image here, or <span className={styles.browseLink}>browse</span>
        </p>
        <p className={styles.dropzoneHint}>JPG, PNG, WEBP, GIF, SVG • Max 10MB</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className={styles.fileInput}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
