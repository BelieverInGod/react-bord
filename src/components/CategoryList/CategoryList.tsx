import React, { useState } from 'react';
import './CategoryList.scss';

interface Category {
    id: number;
    name: string;
    editingName: string;
    isSubcategory?: boolean;
    children?: Category[];
}

interface CategoryListProps {
    categories: Category[];
    onCategoryAdd: (category: Category) => void;
    onCategoryRemove: (category: Category) => void;
}

function CategoryList({ categories, onCategoryAdd, onCategoryRemove }: CategoryListProps) {
    const [newCategoryName, setNewCategoryName] = useState<string>('');
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [categoryInputs, setCategoryInputs] = useState<{ [key: number]: string }>({});

    if (categories.length === 0) {
        categories.push({
            id: Date.now(),
            name: 'Initial Category',
            editingName: 'Initial Category',
            isSubcategory: false,
            children: [],
        });
    }

    const createSubcategory = (parentCategory: Category) => {
        if (categoryInputs[parentCategory.id] && categoryInputs[parentCategory.id].trim() !== '') {
            const newCategory: Category = {
                id: Date.now(),
                name: categoryInputs[parentCategory.id],
                editingName: '',
                isSubcategory: true,
            };

            if (!parentCategory.children) {
                parentCategory.children = [];
            }

            parentCategory.children.push(newCategory);
            setCategoryInputs({ ...categoryInputs, [newCategory.id]: '' });
        }
    };

    const createCategory = () => {
        if (newCategoryName.trim() !== '') {
            const newCategory: Category = {
                id: Date.now(),
                name: newCategoryName,
                editingName: '',
                isSubcategory: false,
                children: [],
            };

            categories.push(newCategory);
            setNewCategoryName('');
        }
    };

    const updateCategoryInput = (categoryId: number, value: string) => {
        setCategoryInputs({ ...categoryInputs, [categoryId]: value });
    };

    const handleCategoryNameChange = (category: Category, newName: string) => {
        category.editingName = newName;
    };

    const handleCategoryNameBlur = (category: Category) => {
        category.name = category.editingName;
        setEditingCategory(null);
    };

    const toggleEdit = (category: Category) => {
        if (editingCategory === category) {
            setEditingCategory(null);
        } else {
            setEditingCategory(category);
        }
    };

    const deleteCategory = (category: Category, parentCategory?: Category) => {
        if (parentCategory && parentCategory.children) {
            parentCategory.children = parentCategory.children.filter((c) => c !== category);
        } else {
            categories = categories.filter((c) => c !== category);
        }
        onCategoryRemove(category);
    };

    const renderCategory = (category: Category, parentCategory?: Category) => {
        const isEditing = editingCategory === category;

        return (
            <li key={category.id}>
                <div className="category-item">
                    {isEditing ? (
                        <input
                            type="text"
                            value={category.editingName}
                            onChange={(e) => handleCategoryNameChange(category, e.target.value)}
                            onBlur={() => handleCategoryNameBlur(category)}
                            autoFocus
                        />
                    ) : (
                        <input
                            type="text"
                            value={categoryInputs[category.id]}
                            onChange={(e) => updateCategoryInput(category.id, e.target.value)}
                            onBlur={() => handleCategoryNameBlur(category)}
                        />
                    )}
                    <button className='delete-button' onClick={() => deleteCategory(category, parentCategory)}>Delete</button>
                    <button className="subcategory-button" onClick={() => createSubcategory(category)}>+</button>

                </div>
                {category.children && (
                    <ul>
                        {category.children.map((childCategory) => (
                            <li key={childCategory.id}>
                                {renderCategory(childCategory, category)}
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        );
    };

    const renderRootCategories = () => {
        return categories.map((category) => (
            renderCategory(category)
        ));
    };

    return (
        <div className="CategoryList">
            {/* <h2>Categories</h2> */}
            <ul>
                {renderRootCategories()}
                <li>
                    {/* <input
                        type="text"
                        placeholder="New category"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <button className="category-button" onClick={() => createCategory()}>Add Category</button> */}
                </li>
            </ul>
        </div>
    );
}

export default CategoryList;
