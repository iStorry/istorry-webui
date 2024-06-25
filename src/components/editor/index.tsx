"use client";

import { Editor as EditorClass } from "@tiptap/core";
import type { EditorProps } from "@tiptap/pm/view";
import {
  EditorContent,
  Extension,
  type JSONContent,
  useEditor,
} from "@tiptap/react";
import { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from "./extensions";

interface WebEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  defaultValue?: JSONContent | string;
  onDebouncedUpdate?: (editor?: EditorClass) => void | Promise<void>;
  debounceDuration?: number;
  onEditorUpdate?: (editor?: EditorClass) => void | Promise<void>;
  extensions?: Extension[];
  editorProps?: EditorProps;
}

export function WebEditor({
  className = "relative w-full focus:ring-orange-600 focus:outline-8 max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg",
  defaultValue,
  onDebouncedUpdate,
  debounceDuration = 750,
  onEditorUpdate,
  extensions = [],
  editorProps,
}: WebEditorProps) {
  const debouncedUpdates = useDebouncedCallback(
    async ({ editor }: { editor: EditorClass }) => {
      onDebouncedUpdate && onDebouncedUpdate(editor);
    },
    debounceDuration
  );

  const editor = useEditor({
    // extensions: [...extensions],
    extensions: [...defaultExtensions, ...extensions],
    editorProps: {
      // ...defaultEditorProps,
      ...editorProps,
    },
    onUpdate: (e) => {
      onEditorUpdate && onEditorUpdate(e.editor);
      debouncedUpdates(e);
    },
  });

  // hydrate the editor with the defaultValue.
  useEffect(() => {
    if (!editor) return;

    if (defaultValue) {
      editor.commands.setContent(defaultValue);
    }
  }, [editor, defaultValue]);

  const prev = useRef("");

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className={className}
    >
      {/* {editor && <EditorBubbleMenu editor={editor} />}
      {editor?.isActive("image") && <ImageResizer editor={editor} />} */}
      <EditorContent editor={editor} />
    </div>
  );
}
