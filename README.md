# MCU Tracker

This is a simple static site for tracking MCU movies. It fetches data from the public MCU API and allows you to mark movies as watched.

## Local development

Run a local server from the project root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deploying to Netlify

1. Log in to [Netlify](https://app.netlify.com/) and create a new site from your Git repository.
2. When asked for build settings, keep the **Build command** empty and set **Publish directory** to `./`.
3. Once the build finishes, you can assign a custom domain. For example this repository can be deployed to `https://mcu-tracker-app.windsurf.build/`.

The included `netlify.toml` file sets the publish directory to the project root.
