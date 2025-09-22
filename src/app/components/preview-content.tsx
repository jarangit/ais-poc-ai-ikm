import React from "react";
import 'react-quill/dist/quill.snow.css';
import '../preview.css';
type Props = {
  value?: string;
};

const PreviewContent = ({ value }: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-bold ">Preview Content</h1>
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: value ?? "" }} />
      </div>
    </div>
  );
};

export default PreviewContent;
