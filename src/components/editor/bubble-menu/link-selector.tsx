"use client";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { getUrlFromString } from "../../../lib/utils";
import { Editor } from "@tiptap/core";
import { Check, LinkIcon, Trash } from "lucide-react";
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useRef,
} from "react";

interface LinkSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const LinkSelector: FC<LinkSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  const handleLinkSubmission = () => {
    const url = getUrlFromString(inputRef.current?.value || "");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <Button
        variant={editor.isActive("link") ? "secondary" : "ghost"}
        size="icon"
        className="rounded-none"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <LinkIcon className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="fixed top-full z-[99999] mt-1 overflow-hidden w-60 flex animate-in fade-in slide-in-from-top-1">
          <Input
            ref={inputRef}
            placeholder="Paste a link"
            className="rounded-e-none"
            defaultValue={editor.getAttributes("link").href || ""}
          />
          {editor.getAttributes("link").href ? (
            <Button
              variant="destructive"
              className="rounded-none rounded-e-md"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setIsOpen(false);
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="default"
              className="rounded-none rounded-e-md"
              onClick={handleLinkSubmission}
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
