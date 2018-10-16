![Image of MaraudersApp](public/images/maraudersapp.png?raw=true)
### [Link to App](https://maraudersapp.herokuapp.com/)

## About The App
Ever wondered what the wizarding world would do with all the technology available in the world today? Probably nothing because magic, but hey! Let's pretend the shops in Diagon Alley have websites -- and to get to those websites, you have to go through normal muggle websites.
Like a sock website.
The Laughing Sock acts as a portal for Ollivander's Wand Shop website. Think of the checkbox you usually have to click when signing up for new websites to say you're not a robot. Here, you have to specify that you're not a muggle.
Once you do that, it takes you straight to the wand shop's website where you can shop all the wands your heart desires! Logging out will take you back to the sock shop if you get cold feet. **ba dum tsss**

## Unsolved Mysteries
As far as authorization flow goes, I have yet to successfully check if the user is a wizard or not. I tried using nested if statements and it would work to an extent. If the user is a wizard, it would work just fine, but if the user was a muggle, the website would get stuck in a loading loop and eventually break.

I've also yet to add full functionality for the cart. Adding to cart will decrement the quantity but doesn't push to the array yet.

I also plan to redesign the register screen upon solving the authorization flow problem.

## Credits
[Pottermore](https://www.pottermore.com/) for the wand descriptions

[Flaticon](https://www.flaticon.com/) for the sock and shopping cart pngs

[InsertHTML](https://www.inserthtml.com/2012/06/custom-form-radio-checkbox/) for how to edit a checkbox

The Kingsman assignment for help with authorization flow and seeding premade users
