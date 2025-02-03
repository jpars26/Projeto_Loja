const customers = [
    {
      id: "1",
      name: "Amanda Brandao",
      image: "https://scontent-gru1-2.cdninstagram.com/v/t39.30808-6/469939628_1119148413549687_5393429464391665771_n.jpg?stp=c0.0.1045.1305a_dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDQ1eDEzMDYuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-gru1-2.cdninstagram.com&_nc_cat=103&_nc_ohc=614fmDwCvzEQ7kNvgHRCIYK&_nc_gid=98c46c04932c4d86a833f7687317f038&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzUyNTg0Njc3MTY5MTU5OTE4OQ%3D%3D.3-ccb7-5&oh=00_AYBDYwU7fJdspOpZ2LyYjZVkiYUfOdwPU114WqY49PEnhQ&oe=67A54796&_nc_sid=22de04",
    },
    {
      id: "2",
      name: "Elisa Melo",
      image: "https://scontent-gru1-2.cdninstagram.com/v/t39.30808-6/473831023_1147066280757900_3647463369421480680_n.jpg?stp=c0.0.1366.1706a_dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzY2eDE3MDcuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-gru1-2.cdninstagram.com&_nc_cat=100&_nc_ohc=rXzdcbiFtEkQ7kNvgFOLfQW&_nc_gid=d574a46a75c74e2b913293fd9a05853c&edm=AP4sbd4AAAAA&ccb=7-5&ig_cache_key=MzU0Nzc3NjI2NzI5NTg2MjgzNg%3D%3D.3-ccb7-5&oh=00_AYAToJQPU5_nnl8-DnNw3JV-ZJHjTHc5o8E91bcZEIN5wQ&oe=67A5419F&_nc_sid=7a9f4b",
    },
    {
      id: "3",
      name: "Bruna Alves",
      image: "https://scontent-gru1-2.cdninstagram.com/v/t39.30808-6/469911762_1119151293549399_6835730610215481676_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEzNTAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-gru1-2.cdninstagram.com&_nc_cat=103&_nc_ohc=uhw3QnPSHG4Q7kNvgEacl5C&_nc_gid=98c46c04932c4d86a833f7687317f038&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzUyOTQ3MDYyODg2NjgxNTA3OA%3D%3D.3-ccb7-5&oh=00_AYBr_74p_LgEphBUhDwEiwLDu5yV6ZMA3UwzAqNokXn2Vg&oe=67A5562B&_nc_sid=22de04",
    },
    {
      id: "4",
      name: "Beatriz",
      image: "https://scontent-gru2-2.cdninstagram.com/v/t39.30808-6/474517511_1147926434005218_2647169217216831486_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-gru2-2.cdninstagram.com&_nc_cat=106&_nc_ohc=kUqrh8eNgDUQ7kNvgGpfBbF&_nc_gid=d574a46a75c74e2b913293fd9a05853c&edm=AP4sbd4AAAAA&ccb=7-5&ig_cache_key=MzU1MTIxMzkzNjgwNDc5MzQyMw%3D%3D.3-ccb7-5&oh=00_AYCs-vt_FQjbQHGNIxsHSGZZKzTDV-stD0f7rY7nYXoZGQ&oe=67A54D20&_nc_sid=7a9f4b",
    },
    {
      id: "5",
      name: "Beatriz",
      image: "https://scontent-gru1-2.cdninstagram.com/v/t39.30808-6/467782340_1107315151399680_3764487204601622065_n.jpg?stp=c0.2.1440.1777a_dst-jpg_e35_s640x640_sh0.08_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3ODEuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-gru1-2.cdninstagram.com&_nc_cat=100&_nc_ohc=w3QotYYVZE0Q7kNvgFFTlbg&_nc_gid=98c46c04932c4d86a833f7687317f038&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzUxOTMyMzgwNDk5MzQyMzg5NQ%3D%3D.3-ccb7-5&oh=00_AYCnGsZLNeO6IzSijcD92joGHGiURq50KmsfuXw1tOajsQ&oe=67A5390F&_nc_sid=22de04",
    },
    {
      id: "6",
      name: "Debora Vieira",
      image: "https://lh3.googleusercontent.com/fife/ALs6j_FZaURHCnptsbcWKtzeV8fh0buKLK0XpET9ndP1FAlJBu2EVQHy0cGgW0dgy5jq0_SgoCU1KJ62RpWdgXDJhfkFug32g1b4iPmS2Cr6NK89xe_sHQlvs4nqKA-dPcz2vFV-fX_oveLrBqRtqyYFyghriyntEHtKbQbkdEvIRTkit-sP0Kb9F1MD8E4ttneiikkQ6T9V03Tcosr1hC5PCW5oquOBOfhOpnXLW3y7ZJ8wr6cEVpyBw6ZbzmF6WnDRz_1u1n9afw5zhWu_x4Tw8d4pDaxgM5LAtOD1mMjNgC81xEobT-UNMNXE-FLfyhji5dIcSnqR-ZMQSf5iZEq50Y9-WM4PhjifOoT0D0ezQPY-uXPvQ0SqZqlMcvb9TunI0SYxzrSaQWCOzm6Ba-LjLDGfNH-u5x2j1cL-mOoXmpGRmc-bxm1oBdXl1fS_Un4W812YGUOwRDOryXSSn43BHqS2enKrX6ZIOlLAFKIrl7VHD109Cwrtr7VWYGtpgAOjulTpBGys1IYeyscBin9ewb66zhIKM5nFZqIjNzAIh_72BMJyqEOz3QAsfCUBUS6ml-KeGoGoLVM_TQL845FyjJspnH83rn7DM2GDoNs6PthbfKshpDex3jpQtUDgKJ9YiOWJgI86R4KpQxSUM89fdOEFCdygfYiTBzRc-2J4P1fpRLGkI8iulxsrVi_nNXlkUwTOzGFFrqfd46Z2lDYV87FfCSygdJP35EZO2l_NMTpcspZZcCDB903lK0GWQ8TK2b2AYlrPyAdnp8A3wS7w_3xtSVUMbeEgyV_Fjo2eLxmwuS0nHLlEGn_YxZtbnr0nkdW81K0fR7arUWKdacoBtJGRh1uZAy3IE-yeF0F_-_NcwYn47LDgn9rPog-TG1_DfCzdA3v8ambIaIMPOPFQ6C3vu6JpL5BsjqhfYsA90G56n9-ciHcSG894c4sSaZSRo-cseDgEQq_LokmKal4GMJzyvFZf9crwfGMeVOlbTL7OxmIPU2Xh52V26D82EaYVcHtgEf8GWHNR5qvMkBW7NwP2AFSxKyzyXl--x8PzQxx9IT9pFtFwxqqWCSq5eQ-eBEVzAu1UXw55i2VfWYf1EtG3vvqU2ctXoSTTRHYZ_jbFIljff-7f6koJds-VZrsRuJeks-7pIIXGub80Yxr4Fu32wk2LCS5GdJffrvg4sgbqKonBJwkqFglq5yx8V2uSSz7Ln7Wnd7qnUFE8zih5YjunRD9_jfaG4zkk_3jwanNB7jpftgm4-viy2v5MoSWjrvzwE-EMrjUgkjlfPnugEzOH_jC7htyKjCrgVzJfXkzC8sfEnZ1H2jAlwDDx7i_XdUmXvGmHkO2VZl3eT8NvFQxE03GKS9Fyh2j953osA0hGmJQ_YtaIlp3Tdq0vUwMrgLLsZJsE0gblrMhUUNdSB25bJW1Ab1kDPtbmVXiGa0nEE91m7hCBnbXwmsqCLTIuY601FAaqADqBI4ikVbn-oQb78h261oUwFHIoW6ehGyJjhrKhjBvPyluGZie7hZOa2-ow3Fkk0wzLmGr-rQlhTJqRyU8Jxf-4dZvnx79NK0ZNrMbDlhQ0tvK0bm5Si8yCQ-4YOXZ4NslIugRYT0ufse9asV1mNTMumwudTyhOcSKUn6JekH6WaR30mwyrQ-l5se1Q5GB01fVpTtYzmwVH1D8dIZ3z=w1365-h945",
    },
    // adicione os outros itens...
  ];

  export default customers;

  