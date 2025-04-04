import { Octokit } from '@octokit/rest';
import { marked } from 'marked';
import { Buffer } from 'buffer';

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN
});

const REPO_OWNER = 'charannsai';
const REPO_NAME = 'rapiduix-components';
const BLOG_GIST_ID = 'f4f43f025ea36db122c7fc0ca47e8059';

export const fetchComponentList = async () => {
  try {
    // Fetch the main components list
    const { data: componentsListFile } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: 'components-list.json',
    });

    const componentsList = JSON.parse(
      Buffer.from(componentsListFile.content, 'base64').toString()
    );

   const componentsWithMetadata = await Promise.all(
  componentsList.map(async (component) => {
    try {
      // Extract framework dynamically from the component path
      const framework = component.path.split("/")[0]; // Extracts "reactnative"

      const { data: metadataFile } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: `${framework}/${component.name}/metadata.json`, // ✅ Now correctly structured
      });

      const metadata = JSON.parse(
        Buffer.from(metadataFile.content, "base64").toString()
      );

      return {
        ...component,
        ...metadata,
      };
    } catch (error) {
      console.error(`Error fetching metadata for ${component.name}:`, error);
      return component;
    }
  })
);


    return componentsWithMetadata;
  } catch (error) {
    console.error('Error fetching component list:', error);
    throw error;
  }
};

export const fetchComponentCode = async (componentPath, framework = 'react-native') => {
  try {
    const extension = framework === 'flutter' ? '.dart' : '.tsx';
    const { data: codeFile } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: `${framework}/${componentPath}/${componentPath}${extension}`,
    });
console.log(componentPath)
    const code = Buffer.from(codeFile.content, 'base64').toString();
    return code;
  } catch (error) {
    console.error('Error fetching component code:', error);
    throw error;
  }
};

export const fetchComponentDocs = async (componentPath, framework = 'react-native') => {
  try {
    const { data: docsFile } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: `${framework}/${componentPath}/${componentPath}.md`,
    });
    const markdown = Buffer.from(docsFile.content, 'base64').toString();
    return marked.parse(markdown);
  } catch (error) {
    console.error('Error fetching component documentation:', error);
    throw error;
  }
};


export const generateExpoSnackURL = (code) => {
  // Remove imports that are not needed in Expo Snack
  const processedCode = code
    .replace(/import\s+{\s*[^}]+\s*}\s+from\s+['"]@expo\/html-elements['"];?\n?/g, '')
    .replace(/import\s+{\s*[^}]+\s*}\s+from\s+['"]react-native-web['"];?\n?/g, '');

  // Add necessary imports for Expo Snack
  const snackCode = `
import React from 'react';
import { View } from 'react-native';

${processedCode}

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      ${code.includes('export default') ? '<Component />' : ''}
    </View>
  );
}`;

  // Encode the code for URL
  const encodedCode = encodeURIComponent(snackCode);
  return `https://snack.expo.dev/?code=${encodedCode}`;
};

export const fetchBlogPosts = async () => {
  try {
    const response = await octokit.gists.get({
      gist_id: BLOG_GIST_ID
    });

    const blogPostsFile = response.data.files['blog_posts.json'];
    if (!blogPostsFile) {
      return [];
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
    return [];
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