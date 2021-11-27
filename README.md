# remark-docusaurus-tabs

[**remark**][https://github.com/remarkjs/remark] plugin to transform standard markdown headings to [**docusaurus**][https://github.com/facebook/docusaurus] (v2) JSX tabs.

## Install

```sh
npm install remark-docusaurus-tabs
```

Then add it to your site's `docusaurus.config.js` [`plugins`](https://docusaurus.io/docs/markdown-features/plugins#installing-plugins) option:

```
module.exports = {
  // ...
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        // ...
        docs: {
          remarkPlugins: ['remark-docusaurus-tabs'],
        },
      },
    ],
  ],
};
```

### Use

Annotate the markdown with a `tabs` comment prior to the first tab heading. For example, the following markdown file:

```md
<!--tabs-->
# Apple

This is an apple 🍎

# Orange

This is an orange 🍊

# Banana

This is a banana 🍌
```

will be transformed to:

```mdx
import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

<Tabs>

<TabItem label="Apple" value="tab1">

This is an apple 🍎

</TabItem>

<TabItem label="Orange" value="tab2">

This is an orange 🍊

</TabItem>

<TabItem label="Banana" value="tab3">

This is a banana 🍌

</TabItem>

</Tabs>
```

The first heading after the `tabs` comment becomes the first tab, with the other tabs taken from the headings with the same level as the first heading. The tab body is the content between the headings. The tabs finish when there is a higher level heading, or may be terminated explicitly with a `/tabs` comment.

## License

[MIT][LICENSE] © [Paul McClean][author]
