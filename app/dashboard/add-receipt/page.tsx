"use client";

import { Upload, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { maxSize, schema } from "./schema";
import { uploadReceipt } from "./services";

const maxFiles = 1;

export default function AddReceiptPage() {
  const [isPending, setIsPending] = React.useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onsubmit = async (data: z.infer<typeof schema>) => {
    setIsPending(true);
    try {
      const uploadRes = await uploadReceipt(data.file);
      if (!uploadRes) {
        throw new Error("Failed to add receipt");
      }
      const res = await fetch("/api/receipts/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileId: uploadRes.id,
        }),
      });

      toast.success("Receipt added successfully");
      console.log("Receipt added successfully:", res);
    } catch (error) {
      toast.error("Failed to add receipt");
      console.error("Error adding receipt:", error);
    } finally {
      setIsPending(false);
      form.reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Add Receipt</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="w-full max-w-md"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileUpload
                    value={field.value && [field.value]}
                    onValueChange={(files) => field.onChange(files[0])}
                    onFileReject={(_, message) => {
                      form.setError("file", {
                        message,
                      });
                    }}
                    maxFiles={maxFiles}
                    maxSize={maxSize}
                  >
                    <FileUploadDropzone>
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center justify-center rounded-full border p-2.5">
                          <Upload className="size-6 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-sm">
                          Drag & drop files here
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Or click to browse (max {maxFiles} file
                          {maxFiles > 1 ? "s" : ""}, up to{" "}
                          {maxSize / 1024 / 1024}MB each)
                        </p>
                      </div>
                      <FileUploadTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 w-fit"
                        >
                          Browse files
                        </Button>
                      </FileUploadTrigger>
                    </FileUploadDropzone>
                    <FileUploadList>
                      {field.value && (
                        <FileUploadItem value={field.value}>
                          <FileUploadItemPreview />
                          <FileUploadItemMetadata />
                          <FileUploadItemDelete asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-7"
                            >
                              <X />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </FileUploadItemDelete>
                        </FileUploadItem>
                      )}
                    </FileUploadList>
                  </FileUpload>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit" className="mt-4 w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
