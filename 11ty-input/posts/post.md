---
layout: default.liquid
pagination:
  data: posts
  size: 1
  alias: post
permalink: 'posts/{{ post.id }}/'
eleventyComputed:
  title: '{{ post.title }}'
  base: 'posts'
---

{{post.content}}
