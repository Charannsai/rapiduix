import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ components = [] }) {
  const location = useLocation();
  const [expandedCategories] = useState(new Set(['overview']));

  // Create an overview section that contains all components
  const overviewSection = {
    name: 'Overview',
    slug: 'overview',
    components: components.map(component => ({
      name: component.title || component.name,
      slug: (component.title || component.name).toLowerCase().replace(/\s+/g, '-')
    }))
  };

  return (
    <div className="w-64 h-[calc(100vh-4rem)] overflow-y-auto fixed left-0 top-16 p-4 border-r border-border bg-background/80 backdrop-blur-sm">
      <nav className="space-y-1">
        {/* Overview Section */}
        <div className="mb-4">
          <div className="px-3 py-2 text-sm font-medium">
            {overviewSection.name}
          </div>
          <div className="mt-1 ml-4 space-y-1">
            
          </div>
        </div>

        {/* Individual Components */}
        <div className="space-y-1">
          {components.map((component) => {
            const slug = (component.title || component.name).toLowerCase().replace(/\s+/g, '-');
            return (
              <Link
                key={slug}
                to={`/components/${slug}`}
                className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                  location.pathname === `/components/${slug}`
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {component.title || component.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;