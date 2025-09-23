/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoBgNARATAdA7DArBSUoGYToIxxAFgDYpEBOEU7KOKUuUwgDkMW0ecP3UL0fXO74QKCAFMAdinRhg2MHPByFAXUiM8AM3QATOBGVA===
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  DecoupledEditor,
  Alignment,
  AutoImage,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  CKBox,
  CKBoxImageEdit,
  CloudServices,
  Code,
  Emoji,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageEditing,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  ImageUtils,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Mention,
  Minimap,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  RemoveFormat,
  Strikethrough,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TodoList,
  Underline,
} from "ckeditor5";
import {
  DocumentOutline,
  LineHeight,
  MultiLevelList,
  SourceEditingEnhanced,
} from "ckeditor5-premium-features";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import { ClientSideCustomEditorProps } from "./client-side";

const LICENSE_KEY =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NTk1MzU5OTksImp0aSI6IjlkYWEwZjU2LWI2MjAtNDIyZS1iNDA0LWY5OTkwM2EyMDI2ZCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6Ijg3ODg1NTNiIn0.RVsGVN2SbpNuIllAXilfPoENX3R_hCmbc2hX1hX5asCz6yM4K9WZUyA_IjlaXpc1xFvKG1HrYlWp0vbAi_uN6Q";

const CLOUD_SERVICES_TOKEN_URL =
  "https://e9w5q904y3wz.cke-cs.com/token/dev/32da1193da76d986bbc730e51b90e76e14ae7e7572a44fb61f8d8bfbc339?limit=10";


export default function App({value, onChange}: ClientSideCustomEditorProps) {
  const editorContainerRef = useRef(null);
  const editorMenuBarRef = useRef(null);
  const editorToolbarRef = useRef(null);
  const editorOutlineRef = useRef(null);
  const editorRef = useRef(null);
  const editorMinimapRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "sourceEditingEnhanced",
            "|",
            "heading",
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "link",
            "insertImage",
            "insertTable",
            "highlight",
            "blockQuote",
            "|",
            "alignment",
            "lineHeight",
            "|",
            "bulletedList",
            "numberedList",
            "multiLevelList",
            "todoList",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Alignment,
          AutoImage,
          Autosave,
          BalloonToolbar,
          BlockQuote,
          Bold,
          CKBox,
          CKBoxImageEdit,
          CloudServices,
          Code,
          DocumentOutline,
          Emoji,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          ImageBlock,
          ImageCaption,
          ImageEditing,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          ImageUtils,
          Italic,
          LineHeight,
          Link,
          LinkImage,
          List,
          ListProperties,
          Mention,
          Minimap,
          MultiLevelList,
          Paragraph,
          PasteFromOffice,
          PictureEditing,
          RemoveFormat,
          SourceEditingEnhanced,
          Strikethrough,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TodoList,
          Underline,
        ],
        balloonToolbar: [
          "bold",
          "italic",
          "|",
          "link",
          "insertImage",
          "|",
          "bulletedList",
          "numberedList",
        ],
        cloudServices: {
          tokenUrl: CLOUD_SERVICES_TOKEN_URL,
        },
        documentOutline: {
          container: editorOutlineRef.current,
        },
        fontFamily: {
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1" as const,
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2" as const,
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3" as const,
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4" as const,
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5" as const,
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6" as const,
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true,
            },
          ],
        },
        image: {
          toolbar: [
            "toggleImageCaption",
            "imageTextAlternative",
            "|",
            "imageStyle:inline",
            "imageStyle:wrapText",
            "imageStyle:breakText",
            "|",
            "resizeImage",
            "|",
            "ckboxImageEdit",
          ],
        },
        initialData: value || "<p>Hello from CKEditor 5!</p>",
        licenseKey: LICENSE_KEY,
        lineHeight: {
          supportAllValues: true,
        },
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },
        mention: {
          feeds: [
            {
              marker: "@",
              feed: [
                /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
              ],
            },
          ],
        },
        minimap: {
          container: editorMinimapRef.current,
          extraClasses:
            "editor-container_include-minimap ck-minimap__iframe-content",
        },
        placeholder: "Type or paste your content here!",
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
      },
    };
  }, [isLayoutReady]);

  useEffect(() => {
    if (editorConfig) {
      configUpdateAlert(editorConfig);
    }
  }, [editorConfig]);

  return (
    <div className="main-container">
      <div
        className="editor-container editor-container_document-editor editor-container_include-outline editor-container_include-minimap"
        ref={editorContainerRef}
      >
        <div
          className="editor-container__menu-bar"
          ref={editorMenuBarRef}
        ></div>
        <div className="editor-container__toolbar" ref={editorToolbarRef}></div>
        <div className="editor-container__minimap-wrapper">
          <div className="editor-container__editor-wrapper">
            <div
              className="editor-container__sidebar"
              ref={editorOutlineRef}
            ></div>
            <div className="editor-container__editor">
              <div ref={editorRef}>
                {editorConfig && (
                  <CKEditor
                    onReady={(editor) => {
                      editorToolbarRef.current.appendChild(
                        editor.ui.view.toolbar.element
                      );
                      editorMenuBarRef.current.appendChild(
                        editor.ui.view.menuBarView.element
                      );
                    }}
                    onAfterDestroy={() => {
                      Array.from(editorToolbarRef.current.children).forEach(
                        (child) => child.remove()
                      );
                      Array.from(editorMenuBarRef.current.children).forEach(
                        (child) => child.remove()
                      );
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log('User is typing:', data);
                      if (typeof onChange === 'function') {
                        onChange(data);
                      }
                    }}
                    editor={DecoupledEditor}
                    config={editorConfig}
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className="editor-container__sidebar editor-container__sidebar_minimap"
            ref={editorMinimapRef}
          ></div>
        </div>
      </div>
    </div>
  );
}

/**
 * This function exists to remind you to update the config needed for premium features.
 * The function can be safely removed. Make sure to also remove call to this function when doing so.
 */
function configUpdateAlert(config) {
  if (configUpdateAlert.configUpdateAlertShown) {
    return;
  }

  const isModifiedByUser = (currentValue, forbiddenValue) => {
    if (currentValue === forbiddenValue) {
      return false;
    }

    if (currentValue === undefined) {
      return false;
    }

    return true;
  };

  const valuesToUpdate = [];

  configUpdateAlert.configUpdateAlertShown = true;

  if (!isModifiedByUser(config.licenseKey, "<YOUR_LICENSE_KEY>")) {
    valuesToUpdate.push("LICENSE_KEY");
  }

  if (
    !isModifiedByUser(
      config.cloudServices?.tokenUrl,
      "<YOUR_CLOUD_SERVICES_TOKEN_URL>"
    )
  ) {
    valuesToUpdate.push("CLOUD_SERVICES_TOKEN_URL");
  }

  if (valuesToUpdate.length) {
    window.alert(
      [
        "Please update the following values in your editor config",
        "to receive full access to Premium Features:",
        "",
        ...valuesToUpdate.map((value) => ` - ${value}`),
      ].join("\n")
    );
  }
}
