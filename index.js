function tabs() {
  function renderTabs(tabs, nodes) {
    function getId(tab) {
      return nodes[tab.start].data.id;
    }

    function getLabel(tab) {
      return nodes[tab.start].children[0].value;
    }

    let tabNodes = [];

    tabNodes.push({
      type: "jsx",
      value: `<Tabs defaultValue="${getId(tabs[0])}" values={[${tabs
        .map((tab) => `{label:"${getLabel(tab)}",value:"${getId(tab)}"}`)
        .join(",")}]}>`,
    });

    tabs.forEach((tab) => {
      tabNodes.push({
        type: "jsx",
        value: `<TabItem value="${getId(tab)}">`,
      });

      tabNodes.push(...nodes.slice(tab.start + 1, tab.end));

      tabNodes.push({
        type: "jsx",
        value: `</TabItem>`,
      });
    });

    tabNodes.push({
      type: "jsx",
      value: `</Tabs>`,
    });

    return tabNodes;
  }

  function findTabs(node, index, parent) {
    const tabs = [];

    let depth;

    let tab;
    const { children } = parent;

    while (++index < children.length) {
      const child = children[index];

      if (child.type === "heading") {
        if (depth == null) {
          depth = child.depth;
        }

        if (child.depth < depth) {
          tab.end = index;
          break;
        }

        if (child.depth === depth) {
          if (tab) {
            tab.end = index;
          }

          tab = {};
          tab.start = index;
          tab.end = children.length;
          tabs.push(tab);
        }
      }

      if (child.type === "comment" && child.value.trim() === "/tabs") {
        tab.end = index;
        break;
      }
    }

    return tabs;
  }

  return (tree) => {
    let foundTabs = false;

    const { children } = tree;
    let index = -1;
    while (++index < children.length) {
      const child = children[index];
      if (child.type === "comment" && child.value.trim() === "tabs") {
        const tabs = findTabs(child, index, tree);
        const start = tabs[0].start;
        const end = tabs[tabs.length - 1].end;

        if (tabs.length > 0) {
          foundTabs = true;
          const nodes = renderTabs(tabs, children);
          children.splice(start, end - start, ...nodes);
          index += nodes.length;
        }
      }
    }

    if (foundTabs) {
      children.unshift({
        type: "import",
        value: "import TabItem from '@theme/TabItem';",
      });

      children.unshift({
        type: "import",
        value: "import Tabs from '@theme/Tabs';",
      });
    }
  };
}

module.exports = tabs;
