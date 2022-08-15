---
title: Posts
layout: default.liquid
permalink: 'posts/index.html'
eleventyComputed:
  base: 'posts'
---

<ul>
{%- for post in posts -%}
  <li><a href="./{{ post.id }}/">{{ post.title }}</a></li>
{%- endfor -%}
</ul>
