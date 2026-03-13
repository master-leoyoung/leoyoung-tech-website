# Configuration

Learn how to configure your VitePress site.

## Basic Configuration

The main configuration file is located at `docs/.vitepress/config.js`.

### Title and Description

```javascript
export default defineConfig({
  title: 'Your Site Title',
  description: 'Your site description'
})
```

### Navigation

Configure the top navigation bar:

```javascript
themeConfig: {
  nav: [
    { text: 'Home', link: '/' },
    { text: 'Guide', link: '/guide/getting-started' }
  ]
}
```

### Sidebar

Configure the sidebar navigation:

```javascript
themeConfig: {
  sidebar: [
    {
      text: 'Guide',
      items: [
        { text: 'Getting Started', link: '/guide/getting-started' }
      ]
    }
  ]
}
```

## Advanced Configuration

For more advanced configuration options, refer to the [VitePress documentation](https://vitepress.dev/guide/configuration).
