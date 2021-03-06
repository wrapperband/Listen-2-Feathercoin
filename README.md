## Listen 2 Feathercoin - Listen To Feathercoin  

### APIs and Libraries  
  
Listen To Feathercoin use these libraries:
  
* [Howler.js](http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library) by James Simpson
* [Insight-api](http://insight.is/ )
* [Minify](https://code.google.com/p/minify/) (for minifying Javascript)
  
Listen To Feathercoin uses these APIs:
  
* [fsight.chain.tips](http://fsight.chain.tips/) WebSocket API (For Transactions)
  
### Using Minify   
  
Minify will compress all of the javascript files into a single .js on the fly, reducing script load times from the web.
  
In the main branch, look for this comment in the ```<head>``` of index.html. This section includes the (currently 11) Javascript source files.
  
    <!-- Un-minified Javascript -->
  
To invoke minify (which requires a PHP server), comment those scripts out and comment this script in:
  
    <!-- Minified Javascript -->
  
### License 
  
If you distribute this project in part or in full, please attribute with a link to [the GitHub page](https://github.com/MaxLaumeister/Listen-To-Bitcoin). This software is available under The MIT License, reproduced below.
  
Copyright (c) 2013 Maximillian Laumeister  
  
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
