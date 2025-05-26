"use client";
import React, { useState, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WetroButton } from "./wetro-button";
import { UrlToMarkdown } from "./url-to-markdown";
import { FileUploader } from "./FileUploader";

// Simple Toggle Switch
function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <span>{label}</span>
      <span className="relative inline-block w-10 h-6">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <span
          className={`block w-10 h-6 rounded-full transition-colors duration-200 ${
            checked ? "bg-blue-500" : "bg-gray-300"
          }`}
        ></span>
        <span
          className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-4" : ""
          }`}
        ></span>
      </span>
    </label>
  );
}

export function FileTabs() {
  const [structured, setStructured] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [structuredText, setStructuredText] = useState("");

  return (
    <Tabs defaultValue="web" className="w-full max-w-2xl mx-auto mt-8">
      <TabsList className="mb-4 py-7">
        <TabsTrigger value="web">Web</TabsTrigger>
        <TabsTrigger value="files">Files & Images</TabsTrigger>
        <TabsTrigger value="audio">Audio</TabsTrigger>
        <TabsTrigger value="youtube">Youtube</TabsTrigger>
      </TabsList>
      <TabsContent value="files">
        <div className="text-center text-gray-400 py-12 text-lg font-medium">Files & Images tab coming soon...</div>
      </TabsContent>

      <TabsContent value="web">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Toggle
              checked={structured}
              onChange={setStructured}
              label="Structured Output"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">URL</label>
            <Input
              className="h-11"
              placeholder="https://wetrocloud.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          {structured && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Schema</label>
              <Input
                className="h-11"
                placeholder="Enter structured output details..."
                value={structuredText}
                onChange={(e) => setStructuredText(e.target.value)}
              />
            </div>
          )}
          <WetroButton />
        </div>
      </TabsContent>
      <TabsContent value="audio">
        <div className="text-center">Audio tab coming soon...</div>
      </TabsContent>
      <TabsContent value="youtube">
        <div className="text-center">Youtube tab coming soon...</div>
      </TabsContent>
    </Tabs>
  );
}
