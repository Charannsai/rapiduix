import { Octokit } from '@octokit/rest';
import { Buffer } from 'buffer';

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN
});

const TEMPLATES_GIST_ID = 'c687b1c550813358ad8eaac881e21087';

export const fetchTemplates = async () => {
  try {
    const response = await octokit.gists.get({
      gist_id: TEMPLATES_GIST_ID
    });

    const templatesFile = response.data.files['templates.json'];
    if (!templatesFile) {
      return [];
    }

    try {
      const templates = JSON.parse(templatesFile.content);
      return Array.isArray(templates) ? templates : [templates];
    } catch (parseError) {
      console.error('Error parsing templates JSON:', parseError);
      return [];
    }
  } catch (error) {
    console.error('Error fetching templates:', error);
    return [];
  }
};

export const loadRazorpay = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(window.Razorpay);
    };
    script.onerror = () => {
      reject(new Error('Razorpay SDK failed to load'));
    };
    document.body.appendChild(script);
  });
};