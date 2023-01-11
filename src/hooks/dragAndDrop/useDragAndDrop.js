import { useCallback, useEffect, useRef, useState } from "react";

const useDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);

  // 드래그 이벤트 감지 ref
  const dragAreaRef = useRef();

  const onChangeFile = useCallback(
    (e) => {
      let selectFile = null;
      if (e.type === "drop") {
        selectFile = e.dataTransfer.files[0];
      } else {
        selectFile = e.target.files[0];
      }
      setFile(selectFile);
    },
    [setFile]
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
    onChangeFile(e);
    setIsDragging(false);
  }, [onChangeFile]);
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

  return { dragAreaRef, isDragging, file };
};

export default useDragAndDrop;
