import React, { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const EditorComponent = ({ initialValue, handleEditorChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    editor.on('change', () => {
      handleEditorChange(editor.getContent(), editor);
    });

    return () => {
      editor.off('change');
    };
  }, [handleEditorChange]);

  return (
    <Editor
      apiKey="51j5rfcrw1c3709s0ekcf5mjzip8rg93ja5f4nh4l7z56fak" // Replace with your TinyMCE API key
      initialValue={initialValue}
      init={{
        width: 1000,
        height: 842,
        plugins: [
          'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
          'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
          'table', 'emoticons', 'template', 'help'
        ],
        toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
          'forecolor backcolor emoticons | help',
        menu: {
          favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' }
        },
        menubar: 'favs file edit view insert format tools table help',
        content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 16px }',
      }}
      onInit={(editor) => {
        editorRef.current = editor;
      }}
    />
  );
};

export default EditorComponent;
