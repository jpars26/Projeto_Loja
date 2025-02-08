const testimonials = [
    {
      name: "Amanda Brandao",
      text: "O vestido dos meus sonhos! A Iara Noivas fez com que meu casamento fosse ainda mais especial.",
      image: "https://scontent-gru1-2.cdninstagram.com/v/t39.30808-6/469939628_1119148413549687_5393429464391665771_n.jpg?stp=c0.0.1045.1305a_dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDQ1eDEzMDYuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-gru1-2.cdninstagram.com&_nc_cat=103&_nc_ohc=614fmDwCvzEQ7kNvgHRCIYK&_nc_gid=98c46c04932c4d86a833f7687317f038&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzUyNTg0Njc3MTY5MTU5OTE4OQ%3D%3D.3-ccb7-5&oh=00_AYBDYwU7fJdspOpZ2LyYjZVkiYUfOdwPU114WqY49PEnhQ&oe=67A54796&_nc_sid=22de04",
    },
    {
      name: "Elisa Melo",
      text: "Desde o primeiro atendimento, fui tratada com muito carinho. Meu vestido ficou perfeito!",
      image: "https://scontent-gru1-2.cdninstagram.com/v/t39.30808-6/473831023_1147066280757900_3647463369421480680_n.jpg?stp=c0.0.1366.1706a_dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzY2eDE3MDcuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-gru1-2.cdninstagram.com&_nc_cat=100&_nc_ohc=rXzdcbiFtEkQ7kNvgFOLfQW&_nc_gid=d574a46a75c74e2b913293fd9a05853c&edm=AP4sbd4AAAAA&ccb=7-5&ig_cache_key=MzU0Nzc3NjI2NzI5NTg2MjgzNg%3D%3D.3-ccb7-5&oh=00_AYAToJQPU5_nnl8-DnNw3JV-ZJHjTHc5o8E91bcZEIN5wQ&oe=67A5419F&_nc_sid=7a9f4b",
    },
    {
      name: "Bruna Alves",
      text: "A experiência na Iara Noivas foi incrível! Me senti uma princesa no dia do meu casamento.",
      image: "https://scontent-gru1-2.cdninstagram.com/v/t39.30808-6/469911762_1119151293549399_6835730610215481676_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEzNTAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-gru1-2.cdninstagram.com&_nc_cat=103&_nc_ohc=uhw3QnPSHG4Q7kNvgEacl5C&_nc_gid=98c46c04932c4d86a833f7687317f038&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzUyOTQ3MDYyODg2NjgxNTA3OA%3D%3D.3-ccb7-5&oh=00_AYBr_74p_LgEphBUhDwEiwLDu5yV6ZMA3UwzAqNokXn2Vg&oe=67A5562B&_nc_sid=22de04",
    },
    {
      name: "Letícia Ferreira",
      text: "O atendimento foi excepcional e o vestido superou minhas expectativas!",
      image: "https://scontent-gru2-2.cdninstagram.com/v/t39.30808-6/474517511_1147926434005218_2647169217216831486_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-gru2-2.cdninstagram.com&_nc_cat=106&_nc_ohc=kUqrh8eNgDUQ7kNvgGpfBbF&_nc_gid=d574a46a75c74e2b913293fd9a05853c&edm=AP4sbd4AAAAA&ccb=7-5&ig_cache_key=MzU1MTIxMzkzNjgwNDc5MzQyMw%3D%3D.3-ccb7-5&oh=00_AYCs-vt_FQjbQHGNIxsHSGZZKzTDV-stD0f7rY7nYXoZGQ&oe=67A54D20&_nc_sid=7a9f4b",
    },
    {
      name: "Jacqueline Machado",
      text: "Sem palavras para descrever minha felicidade com o vestido perfeito para o meu grande dia!",
      image: "https://scontent-gru1-2.cdninstagram.com/v/t39.30808-6/467782340_1107315151399680_3764487204601622065_n.jpg?stp=c0.2.1440.1777a_dst-jpg_e35_s640x640_sh0.08_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3ODEuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-gru1-2.cdninstagram.com&_nc_cat=100&_nc_ohc=w3QotYYVZE0Q7kNvgFFTlbg&_nc_gid=98c46c04932c4d86a833f7687317f038&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzUxOTMyMzgwNDk5MzQyMzg5NQ%3D%3D.3-ccb7-5&oh=00_AYCnGsZLNeO6IzSijcD92joGHGiURq50KmsfuXw1tOajsQ&oe=67A5390F&_nc_sid=22de04",
    },
    {
      name: "Helizabelle",
      text: "O carinho e atenção da equipe fizeram toda a diferença. Recomendo de olhos fechados!",
      image: "https://scontent-gru1-2.cdninstagram.com/v/t39.30808-6/475434664_1154466103351251_5748893655671926248_n.jpg?stp=c72.0.1296.1440a_dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-gru1-2.cdninstagram.com&_nc_cat=103&_nc_ohc=j8jy5VyEBksQ7kNvgHBy2j5&_nc_gid=4f56785945ff4eedab80d91deafeca4d&edm=AP4sbd4AAAAA&ccb=7-5&ig_cache_key=MzU1NDgzNzgwODcyNjE0MTA5OQ%3D%3D.3-ccb7-5&oh=00_AYBJeTyr5pQdbYesCTDSkxU4N1TFRxc-4-xlqpgDFc2VKQ&oe=67A69DE9&_nc_sid=7a9f4b",
    },
  ];
  
  export default testimonials;
  