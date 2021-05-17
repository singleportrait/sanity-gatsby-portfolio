const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: [
    // 'create',
    'update',
    // 'delete',
    'publish'
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your portfolio for search engines and social media.'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your portfolio.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'email',
      type: 'string',
      title: 'Contact Email',
      validation: Rule => Rule.regex(emailRegex, {name: 'email'}).required()
    },
    {
      name: 'productContactText',
      type: 'string',
      title: 'Product Contact Button Text',
      description: "If blank, this will fall back to 'Contact Us'"
    },
    {
      name: 'instagram',
      type: 'url',
      title: 'Instagram URL',
    },
    {
      name: 'instagramHandle',
      type: 'string',
      title: 'Instagram Handle',
      description: "This gets used in the site footer. Don't include the @ symbol",
    },
    {
      name: 'footer',
      type: 'siteFooter',
      title: 'Site Footer',
      description: 'Use shift+enter to make 1 line break, and enter to make a paragraph break'
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO Default Site Info',
      description: "This is the homepage social media share info, and the fallback share info for any pages' missing SEO"
    }
  ]
}
