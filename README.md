# remark-docusaurus-tabs

[**remark**][https://github.com/remarkjs/remark] plugin to transform standard markdown headings to [**docusaurus**][https://github.com/facebook/docusaurus] (v2) JSX tabs.

> This package expects [`remark-slug`][https://github.com/remarkjs/remark-slug] to be used before it, which is already the case for docusaurus, but may need to be considered if used outside docusaurus.

## Install

```sh
npm install remark-docusaurus-tabs
```

Then add it to your site's `docusaurus.config.js` `plugins` option:

```
module.exports = {
  // ...
  plugins: ['remark-docusaurus-tabs'],
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

<Tabs defaultValue="apple" values={[{label:"Apple",value:"apple"},{label:"Orange",value:"orange"},{label:"Banana",value:"banana"}]}>

<TabItem value="apple">

This is an apple 🍎

</TabItem>

<TabItem value="orange">

This is an orange 🍊

</TabItem>

<TabItem value="banana">

This is a banana 🍌

</TabItem>

</Tabs>
```

The first heading after the `tabs` comment becomes the first tab, with the other tabs taken from the headings with the same level as the first heading. The tab body is the content between the headings. The tabs finish when there is a higher level heading, or may be terminated explicitly with a `/tabs` comment.

## License

[MIT][LICENSE] © [Paul McClean][author]