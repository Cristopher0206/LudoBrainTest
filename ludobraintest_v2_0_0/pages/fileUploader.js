import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = () => {
    const onDrop = useCallback((acceptedFiles) => {
        // Realiza acciones con los archivos aceptados (puedes subirlos al servidor, etc.)
        console.log('Archivos aceptados:', acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                <input {...getInputProps()} />
                <p>Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos</p>
            </div>
        </main>
    );
};

export default FileUploader;