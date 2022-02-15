# SOFTWARE ENGINEERING IMMERSIVE - PROJECT THREE #

A Full Stack project done in a team of Three with a 1 week deadline.

### Collaborators ###
* [Alex Theoklitou](https://github.com/alextheoklitou "Alex Theoklitou")
* [Esin Yilmazbilek](https://github.com/esinyilmazbilek "Esin Yilmazbilek")

## Sniff ##
The third project on the course, taken immediately after a short Christmas break. In a team of three we had 1 week to create a Full Stack app. We pondered over a few ideas but eventually the idea which we found most fun and exciting was Sniff. A dating app for animals.

![homepage](/assets/homepage.png)

## Brief ##
* Build a full-stack application - by making your own backend and your own front-end.
* Use an Express API to serve your data from the Mongo database.
* Consume your API with a separate front-end built with React.
* Create a MERN app & ensure there is CRUD functionality. 
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut.
* Have a visually impressive design.
* Be deployed online so it's publicly accessible.

## Built With ##
* Frontend
  * React.js
  * JSX
  * CSS and Sass
  * MUI Framework
  * Axios
  * React-Router-Dom
  * Hamburger-React
* Backend 
  * Mongoose
  * MongoDB
  * Express
  * Node.js
  * Insomnia
* Dev Tools
  * Git
  * GitHub
  * FireFox dev tools
  * VScode

## Deployment ##
The app is deployed on Netlify and can be found [**here**](https://loveatfirstsniff.netlify.app/ "here").  

Please use the following credentials to sign in: 

* Email: dolly@email
* Password: pass 

When logged in feel free to start a new chat by selecting the animal you would like to talk with, or continue an existing chat within the chat tab on the navbar.

## Process ##
This one week project was one we were all really excited about. We were able to quickly bounce ideas of features off one another and created our list of must have goals & stretch goals. Here is a screenshot of a section of our planning:

![wireframe](/assets/wireframe.png)

With this being a Full Stack project we agreed we should all participate and work as Full Stack Engineers. So as a team we started with the Backend and built it first, then once the Backend was fully functional we linked it to what would be our Frontend and began building the Frontend. 
During the project we were in constant communication with one another on Zoom, we created our own Slack chat so we could send each other code (& meme’s), scheduled daily team stand up sessions each morning so we could discuss any challenges, talk about wins, and plan the day ahead. 


## Work Split ##
Covering the backend first, my main focus was on the Environment, Router & creating our Database of registered users. 
Alex took on creating the Schema’s for our app and picked up Error handling too. 
Esin focused on our controllers, giving the app CRUD functionality. 
We then picked up other tasks on a first come first serve basis, if you were available you’d let the team know what you were doing next. 

For the front end, I made the Register & Login pages and also the Edit Profile page, giving a ‘form heavy’ experience which I enjoyed. I also took care of the photo uploads using cloudinary.

Alex handled the Index page and it’s extensive filter and also the Show pages.

Esin took charge of the Navbar, Home page and started the Chat feature, Alex joined to assist on the chat once he had completed his tasks & eventually I was also able to provide my input to this too.


## Backend ##
The benefit of us all working together in the Backend was if any problems arose, we all had our “Backend thinking caps” on and would be able to more proactively understand why a problem may be occurring, and as a team we were able to ensure we had everything covered and could test together using Insomnia (albeit on our own machines).

My Backend duties were to take care of the config file which contained the environment and router, and also to input the profile data within our seed file. 

With this being a dating app themed project we wanted routing to handle the same way as you would expect a more traditional website to handle. For example, no account = no access to the dating app goodness which we have to offer. In order to achieve this, I implemented secure routes for all of the route channels apart from the Home page, Register page & Login page. 
```js
router.route('/potentialsniffs')
 .get(secureRoute, users.index)
 
router.route('/potentialsniffs/:userId')
 .get(secureRoute, users.show)
 
router.route('/account/:userId')
 .get(secureRoute, users.show)
 .put(secureRoute, users.update)
 .delete(secureRoute, users.delete)
 
router.route('/chat')
 .get(secureRoute, chat.chatIndex)
 .post(secureRoute, chat.chatCreate)
 
router.route('/chat/:chatId')
 .get(secureRoute, chat.chatShow)
 .delete(secureRoute, chat.chatDelete)
 
router.route('/chat/:chatId/messages')
 .post(secureRoute, chat.messageCreate)
 
router.route('/chat/:chatId/messages/:messageId')
 .delete(secureRoute, chat.messageDelete)

 router.route('/register')
 .post(auth.register)
 
router.route('/login')
 .post(auth.login)
 ```

In order for the secureRoute to work we had to write a function which checks if there is a valid token (which would be granted at the login stage) attached to the user. If there was, access would be granted, if not it would throw an unauthorized error:

```js
async function secureRoute(req, _res , next) {
 try {
   if (!req.headers.authorization) {
     throw new Unauthorized()
   }
   const token = req.headers.authorization.replace('Bearer ', '')
 
   const payload = jwt.verify(token, secret)
 
   const user = await User.findById(payload.sub)
 
   if (!user) {
     throw new Unauthorized()
   }
 
   req.currentUser = user
   req.currentUserId = user._id
 
   next()
 } catch (err) {
   next(err)
 }
}
```

After this a lot of my time was taken adding data to our seeds so we could have multiple accounts ready to go for that dating app UX, here is an example of Dolly the sheep:

```js
 {
   name: 'Dolly',
   email: 'dolly@email',
   password: 'pass',
   passwordConfirmation: 'pass',
   picture: 'https://res.cloudinary.com/sniffers03/image/upload/v1641548909/SEI-project-three/dolly_nbxoin.jpg',
   elevatorPitch: 'Looking for a wolf in sheeps clothing',
   age: 25,
   height: 85,
   weight: 70,
   bodyType: 'Large',
   animalType: 'Sheep',
   politicalView: 'Liberal',
   gender: 'Female',
   sexualOrientation: 'Bisexual',
   lookingFor: ['Relationship'],
   human: 'Don\'t Want Human',
   drinking: true,
   smoking: true,
   religion: 'Atheist',
   houseTrained: false,
   dietaryRequirements: ['Vegan'],
   children: 'Don\'t Want Children',
 }, 
 ```

 ## Frontend ##
 After completing the Backend we progressed to the Frontend together. We broke it up into sections which needed to be completed and each chose an area we’d like to code. After covering the secureRoute in the backend I wanted to continue this theme and create the Register & Login pages, once I moved on to some of the remaining jobs which were to create an account page for our user, where they could view, edit & also delete their profile. 

 ## Register and Login ##

 ![register](/assets/register.png)

 ![login](/assets/login.png)

 Typically when you write the basic register function the user will then be prompted to login, meaning they have to complete the form on the login page next. Recognising that this is not the best UX, we used the data from the register form, matched it with our list of existing profiles and then saved that to local storage, allowing the user to instantly be logged into the site. 

 ```js
  const handleSubmit = async (e) => {
   e.preventDefault()
   try {
     await registerUser(formData)
     const allProfiles = await getAllProfiles()
     const res = await loginUser(loginFormData)
     setToken(res.data.token)
     const userId = allProfiles.data.find(profile => {
       if (profile.email === formData.email) {
         return profile
       } else return
     })._id
     localStorage.setItem('userId', JSON.stringify(userId))
     navigate(`/account/${userId}/edit`)
   } catch (err) {
     setIsError(err)
   }
 }
 ```

 The contents of the login function also stores the userId into localStorage, the same way as the register function above. We found this was vital as it was the only way to link the user to their own account for viewing, editing or deleting. 

## Filtering ##
The filtering on the Index page was incredibly satisfying. The filter has been set in a way which can stack multiple options, allowing for a very specific search.
```js
  const filterProfiles = (profiles) => {
    return profiles.filter(profile => {
      return (
        profile._id !== currentUserId) &&
        (profile.age >= ageMinValue || ageMinValue === null) &&
        (profile.age <= ageMaxValue || ageMaxValue === null) &&
        (profile.weight >= weightMinValue || weightMinValue === null) &&
        (profile.weight <= weightMaxValue || weightMaxValue === null) &&
        (profile.height >= heightMinValue || heightMinValue === null) &&
        (profile.height <= heightMaxValue || heightMaxValue === null) &&
        (profile.bodyType?.includes(bodyTypeValue) || bodyTypeValue === '') &&
        (profile.politicalView?.includes(politicalViewValue) || politicalViewValue === '') &&
        (profile.gender?.includes(genderValue) || genderValue === '') &&
        (profile.sexualOrientation?.includes(sexualOrientationValue) || sexualOrientationValue === '') &&
        (profile.lookingFor?.includes(lookingForValue) || lookingForValue === '') &&
        (profile.human?.includes(humanValue) || humanValue === '') &&
        (String(profile.drinking)?.includes(drinkingValue) || drinkingValue === null) &&
        (String(profile.smoking)?.includes(smokingValue) || smokingValue === null) &&
        (profile.religion?.includes(religionValue) || religionValue === '') &&
        (String(profile.houseTrained)?.includes(houseTrainedValue) || houseTrainedValue === null) &&
        (profile.dietaryRequirements?.includes(dietaryRequirementsValue) || dietaryRequirementsValue === '') &&
        (profile.children?.includes(childrenValue) || childrenValue === '')
    })
  }
  ```

  ![filter](assets/filter.png)

## Delete Functionality ##
When a user is on the account page they can delete their account, doing so will also delete their chat history along with it, this was done by storing their “chats” in state and then attaching the chat._id to the delete request. 

```js
 React.useEffect(() => {
   const getChatData = async () => {
     try {
       const { data } = await getAllChats()
       setChats(data)
     } catch (err) {
       setIsError(err)
     }
   }
   getChatData()
 }, [])
 
 const handleDelete = async () => {
   if (window.confirm('Are you sure you want to delete your account?')) {
     try {
       chats.map( async (chat) => {
         await deleteChat(chat._id)
         return
       })
       await deleteProfile(currentUserId)
       removeToken()
       removeStoredId()
       navigate('/')
     } catch (err) {
       setIsError(err)
     }
   }
 }
 ```

![account](/assets/account.png)

 ## Edit Profile ##
I found the Edit profile page to be as fun as it was time consuming, implementing the framework MUI as I worked meant the form took me some time, however I really enjoyed making use of MUI as well as radio buttons, check boxes & dropdown lists. To ensure better UX I used state so the form will be pre-populated with their previous profile information when looking to make any changes.

 ![editpage](/assets/editpage.gif)

## Chat Feature ##
The chat feature was created with useEffect and by setting our chat users into state. What was important was distinguishing the difference between the user sending the message and the user receiving the message. 

```js
  const [sender, setSender] = React.useState(null)
  const [chat, setChat] = React.useState(null)
  const [userId, setUserId] = React.useState('')
  const currentUserId = JSON.parse(localStorage.getItem('userId'))

  React.useEffect(() => {
    const getData = async () => {
      try {
        const senderData = await getSingleProfile(userId)
        setSender(senderData.data)
        const chatData = await getSingleChat(chatId)
        setChat(chatData.data)
        if (chatObject.userOne !== currentUserId) {
          return setUserId(chatObject.userOne)
        } else {
          return setUserId(chatObject.userTwo)
        }
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [userId, chatId, chatObject.userOne, chatObject.userTwo, currentUserId])
```
![chat](/assets/chat.png)



## Challenges ## 
One of the biggest challenges was working out how we could get the userID, which is created when registering an account, and then using that ID to allow for personalisation on the site. For example, bypassing the login page when registering, viewing your own profile page, deleting your own account, all things chat related. Local Storage was the holy grail to solving this first challenge, and once the syntax was in place we had our hugely satisfying moment of seeing the userID appear in the firefox dev tools. 

Another challenge in this project was the chat feature as a whole, after discussion it was made in a way which each user effectively writes a comment to one another, the same way you would write a comment on a website selling your favourite.. type of cheese(?). However, it has been styled and had features added to it to make it seem like a more traditional chat feature. It was very much uncharted territory for the team and it was constant collaboration and screen sharing as it was chipped away at and progress was made. 
Each time a milestone was met (showing the name of the sender in the message box of the receiver for example) there was a celebratory cheer around the team!

Making the chat feature seem like it was “live” meaning having messages come through instantaneously when another user has sent one, without having to refresh your page. This would allow it to operate much more like a real chat feature. In order to overcome this challenge a setInterval() timer was made and re-renders the page every 500ms. 
```js
 React.useEffect(() => {
 
   const getData = async () => {
     try {
       const { data } = await getSingleChat(chatId)
       setAllMessages(data.messages)
       const profileData = await getSingleProfile(receiverId)
       setReceiverName(profileData.data.name)
       if (data.userOne === currentUserId) {
         setReceiverId(data.userTwo)
       } else {
         setReceiverId(data.userOne)
       }
     } catch (err) {
       console.log(err)
     }
   }
   getData()
   const interval = setInterval(getData, 500)
   return () => clearInterval(interval)
 }, [chatId, currentUserId, receiverId])
 ```

![chatgif](/assets/chatgif.gif)

## Bugs ##
* Currently no known bugs.


## Future Improvements ##
* Make the app mobile responsive.
* Add timestamp to see when a message was sent. 
* Create a like button so you can be connected through likes and not just open chats.
* Using a chat feature plugin.
* Add further error handling. 

## Wins & Key Learnings ##
* This project really helped me understand how important communication and collaboration is when working within a team. The teamwork was excellent and it made the week even more enjoyable.
* The first project in which I worked on different branches and resolved merge conflicts using Git.
Continuing on from the communication, it meant we often merged our work at the same time, as we were new to this it allowed us to help each other with troubleshooting. 
* The amount of “learning as you code” feeling that this had, specifically recognising how multiple things can be stored in state and used in the same function. This felt like leveling up in a game.