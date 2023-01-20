import { useCallback, useEffect, useRef, useState } from "react";

const useDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState(null);

  // 드래그 이벤트 감지 ref
  const dragAreaRef = useRef();

  const onChangeFiles = useCallback(
    (e) => {
      let selectFiles = null;
      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }
      setFiles(selectFiles);
    },
    [setFiles]
  );

  const onClickHandler = useCallback((e) => {
    e.preventDefault();
  }, []);
  const onDragEnterHandler = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation(); // 부모 이벤트 방지
    setIsDragging(false);
  }, []);
  const onDragLeaveHandler = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  const onDragOverHandler = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  }, []);
  const onDropHandler = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onChangeFiles(e);
    setIsDragging(false);
  }, [onChangeFiles]);
  const initDragEvents = useCallback(() => {
    if (dragAreaRef.current !== null) {
      dragAreaRef.current.addEventListener("click", onClickHandler);
      dragAreaRef.current.addEventListener("dragenter", onDragEnterHandler);
      dragAreaRef.current.addEventListener("dragleave", onDragLeaveHandler);
      dragAreaRef.current.addEventListener("dragover", onDragOverHandler);
      dragAreaRef.current.addEventListener("drop", onDropHandler);
    }
  }, [
    onDragEnterHandler,
    onDragLeaveHandler,
    onDragOverHandler,
    onDropHandler,
  ]);

  const resetDragEvents = useCallback(() => {
    if (dragAreaRef.current !== null) {
      dragAreaRef.current.removeEventListener("click", onClickHandler);
      dragAreaRef.current.removeEventListener("dragenter", onDragEnterHandler);
      dragAreaRef.current.removeEventListener("dragleave", onDragLeaveHandler);
      dragAreaRef.current.removeEventListener("dragover", onDragOverHandler);
      dragAreaRef.current.removeEventListener("drop", onDropHandler);
    }
  }, [
    onDragEnterHandler,
    onDragLeaveHandler,
    onDragOverHandler,
    onDropHandler,
  ]);

  useEffect(() => {
    initDragEvents();
    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return { dragAreaRef, isDragging, files };
};

export default useDragAndDrop;
