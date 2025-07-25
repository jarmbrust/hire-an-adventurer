
const AboutPage = () => {
  return (
    <div>
      <p className="text-2xl mt-6 mb-4">Thank you for showing interest in my project!</p>
      <p className="mb-5">
        <span className="italic">Hire an Adventurer</span> is a game I created to demonstrate 
        and practice my React and Next.js skills.  It is a simulation (very) roughly based 
        on a simple e-commerce app.  However, instead of buying stuff, you are hiring
        mercenary fantasy adventurers to slay monsters that are threatening your village!
        <br />
        ...so yeah, mostly the same idea.
      </p>
      <p className="mb-5">
        To play, you select the adventurers you want to hire.  Then go to the cart and hire them -- being mindful
        of the fee for each adventurer and how may coins you have left.  Once you have hired your adventurers,
        go to the Combat section and see if you can defeat the monster!  Monsters are randomly selected from
        a pool.
      </p>
      <p className="mb-5">
        Fighting monsters is taxing for the adventurers however, and they will return from a loss fatigued
        or injured.  You can still hire them for more fights, but this increases their chances of
        injury or even death!
      </p>
      <p className="mb-5">
        If you run out of silver (or adventurers), you can restart the game. Try to rack up as high a score as you can until then!
      </p>
      <div className="mb-5">
        <p className="mb-1 text-lg underline">Upcoming features include:</p>
        <ul>
          <li>A top 10 leaderboard.</li>
          <li>Adding bounties for defeated monsters.</li>
          <li>A resting and healing mechanic for adventurers.</li>
          <li>Improve the flow of the UI.</li>
          <li>Fine-tuning on the combat mechanics.</li>
          <li>Sorting adventurers by various abilities.</li>
          <li>Modifying adventurer stats based on fatigue or injury.</li>
          <li>More monsters and adventurers!</li>
        </ul>
      </div>
      <p className="mt-10">
        * This program was created using React 19, Next.js 15, Tailwind, and PostgreSQL. The code is in
        GitHub and&nbsp;
        <a
          className="text-blue-600"
          href="https://github.com/jarmbrust/hire-an-adventurer" 
          target="_blank"
        >
          can be accessed here
        </a>.
        The images were generated from Google&apos;s ImageFX. 
      </p>
    </div>
  );
}

export default AboutPage;
