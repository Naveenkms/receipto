import z from "zod";

export const maxSize = 5 * 1024 * 1024;

export const schema = z.object({
  file: z.file().max(maxSize, {
    message: `File size must be less than ${maxSize / 1024 / 1024}MB`,
  }),
});
