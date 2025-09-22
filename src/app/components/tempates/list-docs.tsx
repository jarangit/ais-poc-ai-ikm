import React from "react";
import Link from "next/link";

export type Doc = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};


type ListDocsProps = {
  docs?: Doc[];
  _onDelete?: (id: string) => void;
};

const ListDocs: React.FC<ListDocsProps> = ({ docs = [], _onDelete }) => {
  return (
    <div className="w-full mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Documents</h1>
        <Link href="/text-editor">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
            Create New
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">#</th>
              <th className="px-4 py-2 border-b text-left">Title</th>
              <th className="px-4 py-2 border-b text-left">Created At</th>
              <th className="px-4 py-2 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc, idx) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{idx + 1}</td>
                <td className="px-4 py-2 border-b font-medium">{doc.title}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(doc.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-2 border-b">
                  <div className="flex gap-3">
                    <Link
                      href={`/docs/${doc.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    <button className="text-red-500" onClick={() => _onDelete?.(doc.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListDocs;
