import React, { useState, useEffect } from 'react';
import './DragDropScreen.scss';
import CategoryList from '../CategoryList/CategoryList'

interface Category {
    id: number;
    name: string;
    editingName: string;
    isSubcategory?: boolean;
    children?: Category[];
}

interface DragDropScreenProps {
    scale: number;
}



function DragDropScreen({ scale }: DragDropScreenProps) {
    const [draggableObject, setDraggableObject] = useState<{ x: number; y: number } | null>(null);
    const [containerPosition, setContainerPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [categories, setCategories] = useState<Category[]>([]);


    const handleCategoryAdd = (category: Category) => {
        setCategories([...categories, category]);
    };

    const handleCategoryRemove = (category: Category) => {
        const updatedCategories = categories.filter((c) => c !== category);
        setCategories(updatedCategories);
    };

    const handleContainerDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        setDraggableObject({ x: e.clientX, y: e.clientY });
    };

    const handleContainerDrag = (e: MouseEvent) => {
        if (draggableObject) {
            const newX = e.clientX - draggableObject.x;
            const newY = e.clientY - draggableObject.y;
            setContainerPosition({ x: containerPosition.x + newX, y: containerPosition.y + newY });
        }
    };

    const handleContainerDragEnd = () => {
        setDraggableObject(null);
    };

    useEffect(() => {
        if (draggableObject) {
            document.addEventListener('mousemove', handleContainerDrag);
            document.addEventListener('mouseup', handleContainerDragEnd);
        } else {
            document.removeEventListener('mousemove', handleContainerDrag);
            document.removeEventListener('mouseup', handleContainerDragEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleContainerDrag);
            document.removeEventListener('mouseup', handleContainerDragEnd);
        };
    }, [draggableObject]);

    return (
        <div
            className="DragDropScreen"
            style={{
                transform: `scale(${scale / 100}) translate(${containerPosition.x}px, ${containerPosition.y}px)`,
            }}
            id="draggableObject"
            draggable
            onDragStart={handleContainerDragStart}
        >

            <CategoryList
                categories={categories}
                onCategoryAdd={handleCategoryAdd}
                onCategoryRemove={handleCategoryRemove}
            />
        </div>
    );
}

export default DragDropScreen;
