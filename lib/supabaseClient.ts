import { createClient } from "@supabase/supabase-js";

// Load Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log("Supabase URL:", supabaseUrl);
// Don't log the key for security reasons

// Create Supabase client
export const supabase = createClient(
  supabaseUrl || "https://xfmdckbmohponiwalvli.supabase.co", 
  supabaseAnonKey || ""
);

/**
 * Function to get a public image URL from Supabase Storage.
 * @param bucket - Name of the storage bucket
 * @param filePath - File path inside the bucket
 * @returns The full public URL of the image
 */
export const getPublicImageUrl = (bucket: string, filePath: string): string => {
  // Fix the double slash issue by ensuring proper path construction
  const baseUrl = "https://xfmdckbmohponiwalvli.supabase.co/storage/v1/object/public";
  return `${baseUrl}/${bucket}/${filePath}`;
};

/**
 * List all images in a given storage bucket and return their public URLs.
 * @param bucket - Name of the storage bucket
 * @returns Array of public URLs of images
 */
export const listImagesInBucket = async (bucket: string): Promise<string[]> => {
  try {
    console.log(`Listing images in bucket: ${bucket}`);
    
    const { data, error } = await supabase.storage.from(bucket).list();

    if (error) {
      console.error("Error listing images:", error.message);
      return [];
    }

    console.log("Raw bucket data:", data);
    
    // Filter out folders and only keep files
    // Common image extensions to filter by
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'];
    
    const imageFiles = data.filter(item => {
      // Check if it's a file (not a folder) and has an image extension
      const isFile = !item.name.endsWith('/');
      const isImage = imageExtensions.some(ext => item.name.toLowerCase().endsWith(ext));
      return isFile && isImage;
    });
    
    console.log("Filtered image files:", imageFiles);
    
    // Map each file to its public URL
    const urls = imageFiles.map(file => getPublicImageUrl(bucket, file.name));
    console.log("Generated URLs:", urls);
    
    return urls;
  } catch (error) {
    console.error("Error in listImagesInBucket:", error);
    return [];
  }
};