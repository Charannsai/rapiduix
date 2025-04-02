import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

function Sidebar({ categories }) {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const toggleCategory = (category) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="w-64 h-[calc(100vh-4rem)] overflow-y-auto fixed left-0 top-16 p-4 border-r border-border bg-background/80 backdrop-blur-sm">
      <nav className="space-y-1">
        {categories.map((category) => (
          <div key={category.name} className="mb-2">
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
            >
              {category.name}
              <FiChevronRight
                className={`transform transition-transform ${
                  expandedCategories.has(category.name) ? 'rotate-90' : ''
                }`}
              />
            </button>
            {expandedCategories.has(category.name) && (
              <div className="mt-1 ml-4 space-y-1">
                {category.components.map((component) => (
                  <Link
                    key={component.id}
                    to={`/components/${category.slug}/${component.slug}`}
                    className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                      location.pathname === `/components/${category.slug}/${component.slug}`
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {component.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;