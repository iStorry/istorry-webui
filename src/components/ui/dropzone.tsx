import { cn } from "../../lib/utils";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onFileDrop: (files: File[]) => void;
  children: React.ReactNode;
}

export function Dropzone({ onFileDrop, className, children }: DropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      void onFileDrop(acceptedFiles);
    },
    [onFileDrop]
  );

  const { getRootProps, getInputProps, ...drag } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
  });

  return (
    <div
      className={cn(
        "w-full border-2 border-dashed text-center py-10 bg-gray-100 border-gray-300 rounded transition-all duration-200",
        drag.isDragActive && "border-gray-600",
        drag.isDragAccept && "border-green-500",
        drag.isDragReject && "border-red-500",
        className
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
}
