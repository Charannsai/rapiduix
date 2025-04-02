import { Octokit } from '@octokit/rest';
import { marked } from 'marked';

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN
});

const COMPONENTS_GIST_ID = '1b421f3d3be55b7270a69166f169ae58';
const FLUTTER_COMPONENTS_GIST_ID = '2f0e009d9310f0125c2b6b6285bf18ba'; // Replace with actual Flutter gist ID
const BLOG_GIST_ID = 'f4f43f025ea36db122c7fc0ca47e8059'; 

export const fetchComponentList = async () => {
  try {
    const response = await octokit.gists.get({
      gist_id: COMPONENTS_GIST_ID
    });

    const componentsFile = response.data.files['components.json'];
    if (!componentsFile) {
      throw new Error('Components file not found in gist');
    }

    return JSON.parse(componentsFile.content);
  } catch (error) {
    console.error('Error fetching component list:', error);
    throw error;
  }
};

export const fetchComponentCode = async (componentId, framework = 'react-native') => {
  try {
    const gistId = framework === 'flutter' ? FLUTTER_COMPONENTS_GIST_ID : COMPONENTS_GIST_ID;
    const response = await octokit.gists.get({
      gist_id: gistId
    });

    const fileName = framework === 'flutter' 
      ? `component_${componentId}.dart`
      : `component_${componentId}.tsx`;

    const codeFile = response.data.files[fileName];
    if (!codeFile) {
      throw new Error('Component code not found');
    }

    return codeFile.content;
  } catch (error) {
    console.error('Error fetching component code:', error);
    throw error;
  }
};

export const fetchBlogPosts = async () => {
  try {
    const response = await octokit.gists.get({
      gist_id: BLOG_GIST_ID
    });

    const blogPostsFile = response.data.files['blog_posts.json'];
    if (!blogPostsFile) {
      return []; // Return empty array if no posts found
    }

    try {
      const posts = JSON.parse(blogPostsFile.content);
      return Array.isArray(posts) ? posts : [posts];
    } catch (parseError) {
      console.error('Error parsing blog posts JSON:', parseError);
      return [];
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return []; // Return empty array on error
  }
};

export const fetchBlogPostContent = async (slug) => {
  try {
    const response = await octokit.gists.get({
      gist_id: BLOG_GIST_ID
    });
    
    const blogPostsFile = response.data.files['blog_posts.json'];
    if (!blogPostsFile) {
      console.error('Blog posts file not found in gist');
      return null;
    }
    
    let posts;
    try {
      posts = JSON.parse(blogPostsFile.content);
      if (!Array.isArray(posts)) {
        posts = [posts];
      }
    } catch (parseError) {
      console.error('Error parsing blog posts JSON:', parseError);
      return null;
    }
    
    const post = posts.find(p => p.slug === slug);
    if (!post) {
      console.error(`Blog post with slug "${slug}" not found`);
      return null;
    }
    
    if (post.content) {
      return post;
    }
    
    const possibleFileNames = [
      `${slug}.md`,
      `blog_${slug}.md`,
      `posts/${slug}.md`,
      `${post.title.toLowerCase().replace(/\s+/g, '-')}.md`
    ];
    
    let contentFile = null;
    for (const fileName of possibleFileNames) {
      if (response.data.files[fileName]) {
        contentFile = response.data.files[fileName];
        break;
      }
    }
    
    if (!contentFile) {
      return {
        ...post,
        content: marked.parse(post.excerpt || 'Content coming soon...')
      };
    }
    
    const content = marked.parse(contentFile.content);
    return {
      ...post,
      content
    };
  } catch (error) {
    console.error('Error fetching blog post content:', error);
    return null;
  }
};