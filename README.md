## Etch-a-Sketch  

This project is part of the Odin Project [curriculum](https://www.theodinproject.com/courses/web-development-101/lessons/etch-a-sketch-project). The purpose of this project was to build DOM manipulation skills using JavaScript.

### Things I Learned

- One of the biggest hurdles with this project was one of the first things that needed to be done: create the drawing grid using JavaScript. The concept is simple, but it took a lot of digging and effective Googling to find the JS syntax needed to pull it off. Once I found the right combination of tricks, it wasn't so hard.
  - Specifically, I ended up using <code>gridContainer.style['grid-template']</code> along with <code>repeat</code> to get it to work inside the nested <code>for</code> loops.
- At first, after making the "rainbow" option for the pen, it would work but then stop working after resizing the grid. So you'd resize the grid and still have the rainbow pen equipped, but it would be stuck on whatever the last randomly generated color was. I had to figure out how to properly recall the functions for the rainbow pen after calling the <code>resizeGrid</code> function. 
- A similar problem occurred with the "pencil" option. When I first got the function to properly shade the cells upon each successive hover, it wouldn't reset each cell's lightness upon clearing or resizing the grid. I had to implement a kind of counter using <code>setAttribute</code> and <code>getAttribute</code> which would reset upon clearing or resizing the grid, which got it to work just fine.
- Now that it's working pretty well, I plan to implement a couple other small features:
  - Upon clicking a pen button, it would be useful for the button to retain some sort of styling so as to make it clear which type of pen is currently active.
  - I think redoing the layout a bit so it's more versatile regarding varying screen sizes.