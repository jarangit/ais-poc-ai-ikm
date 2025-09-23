import React from "react";
import 'react-quill/dist/quill.snow.css';
import '../preview.css';
type Props = {
  value?: string;
};


const PreviewContent = ({ value }: Props) => {
  return (
    <section className="bg-white py-8 px-4 rounded-lg shadow-md max-w-3xl mx-auto">
      {/* Optional: Blog-style header */}
      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Preview Content</h1>
      </header>
      <article className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-img:rounded-lg prose-img:shadow prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:italic prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 prose-table:shadow-sm prose-table:rounded-lg prose-table:bg-gray-50">
        <div dangerouslySetInnerHTML={{ __html: value ?? "" }} />
      </article>
    </section>
  );
};

export default PreviewContent;
