const Home = () => {
  return (
    <>
      <h2 className="text-3xl font-bold">Welcome to Hire an Adventurer!</h2>

      <p className="mt-4 mb-5 italic">
        Dragon destroying your town?  Minotaur mashing your village?  Goblins going berserk?!
        Hire some adventurers to put the problem to rest!
      </p>
      <p className="mt-4 mb-3">
        In this simulation, you start with 100 silver coins.  You can use this silver to hire adventurers
        to fight monsters plaguing your village.  See how many monsters you can defeat before you either
        run out of silver, or the pool of adventurers are all defeated!
      </p>
      <p className="mt-4 mb-3">
        This program functions similar to a simple e-commerce site.  You load your cart
        with adventurers to hire. You can add and remove adventurers from your cart.
        Hiring the adventurers will deduct from your stash of silver coins and you can hire more if 
        they are available and you have the silver.
      </p>
      <p className="mt-4 mb-3">
        The game functions as such: once you&apos;ve hired your adventurers on the cart page,
        you can then go to the combat page (you will be able to go back and hire more if you decide to).  
        When you are ready, fight the monster(s).  You will be informed whether or not your
        selected group of adventurers were successful in defeating them.  Note that some monsters fly and must be 
        fought with ranged attacks, and others are on terrestrial and must be fought with melee attacks. 
      </p>
      <p>
        As of this writing, the backend and database are simulated, so no progress is saved if 
        you refresh the page. This will be rectified in a near-future version or update.
      </p>
      <p className="mt-4 mb-3">
        To start, simply go to the Available Adventurers section (the button is to the left on the navbar).
      </p>
      <p className="mt-6 mb-5">
        * Note, this program was created using React 19 and Next.js, and the code can be located here:&nbsp;
        <a
          className="text-blue-600"
          href="https://github.com/jarmbrust/hire-an-adventurer" 
          target="_blank"
        >
          https://github.com/jarmbrust/hire-an-adventurer
        </a>.
        The images were generated from Google&apos;s ImageFX. 
      </p>
    </>
  );
};

export default Home;
