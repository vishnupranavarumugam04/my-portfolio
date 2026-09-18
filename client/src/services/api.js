const API_BASE = '/api';

export const api = {
  // Fetch full site content
  async getSiteData() {
    try {
      const res = await fetch(`${API_BASE}/site`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch site data`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error('API Error (getSiteData):', err);
      throw err;
    }
  },

  // Update site content
  async updateSiteData(siteData) {
    try {
      const res = await fetch(`${API_BASE}/site`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(siteData)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to update site data`);
      const json = await res.json();
      return json;
    } catch (err) {
      console.error('API Error (updateSiteData):', err);
      throw err;
    }
  },

  // Proxy fetch GitHub Repos with cache
  async getGitHubRepos(username) {
    if (!username) return [];
    try {
      const res = await fetch(`${API_BASE}/github/${encodeURIComponent(username)}/repos`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch GitHub repos`);
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.error('API Error (getGitHubRepos):', err);
      return [];
    }
  },

  // Upload hero / avatar image
  async uploadImage(file) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to upload image`);
      const json = await res.json();
      return json.url;
    } catch (err) {
      console.error('API Error (uploadImage):', err);
      throw err;
    }
  }
};
