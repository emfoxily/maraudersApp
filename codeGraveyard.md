store.get('/', (req, res) => {
  if (req.session.currentUser) {
    if (req.session.isWizard === true) {
    // console.log(req.session.currentUser);
      Wands.find({}, (error, allWands) => {
        res.render('index.ejs', {
          wands: allWands,
          currentUser: req.session.currentUser
        })
      })
    } else {
      Socks.find({}, (error, allSocks) => {
        res.render('index.ejs', {
          socks: allSocks,
          currentUser: req.session.currentUser
        })
      })
    }
  } else {
    console.log('what did you break this time?');
  }
})


Wands.find({}, (error, allWands) => {
  res.render('index.ejs', {
    wands: allWands,
    // session: req.session,
    currentUser: req.session.currentUser
  })
})
} else {
Socks.find({}, (error, allSocks) => {
  res.render('index.ejs', {
    socks: allSocks,
    // session: req.session,
    currentUser: req.session.currentUser
  })
})
}
})

store.get('/', (req, res) => {
  if (req.session.currentUser) {
      if (req.session.currentUser.isWizard == true) {
          console.log('the user is a wizard!')
          Wands.find({}, (error, allWands) => {
            res.render('index.ejs', {
              wands: allWands,
              currentUser: req.session.currentUser
            })
          })
      } else {
          console.log ('the user is a muggle or not registered!')
          Socks.find({}, (error, allSocks) => {
            res.render('index.ejs', {
              socks: allSocks,
              currentUser: req.session.currentUser
            })
          })
      }
  }
})
