import { createClient } from "@supabase/supabase-js";

// Load Supabase credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Function to get a public image URL from Supabase Storage.
 * @param bucket - Name of the storage bucket
 * @param filename - File name inside the bucket
 * @returns The full public URL of the image
 */
export const getPublicImageUrl = (bucket: string, filePath: string): string => {
  return `https://xfmdckbmohponiwalvli.supabase.co/storage/v1/object/public/${bucket}//${filePath}`;
};


/**
 * List all images in a given storage bucket and return their public URLs.
 * @param bucket - Name of the storage bucket
 * @returns Array of public URLs of images
 */
export const listImagesInBucket = async (bucket: string): Promise<string[]> => {
  const { data, error } = await supabase.storage.from(bucket).list();

  if (error) {
    console.error("Error listing images:", error.message);
    return [];
  }

  return data.map((file) => getPublicImageUrl(bucket, file.name));
};
