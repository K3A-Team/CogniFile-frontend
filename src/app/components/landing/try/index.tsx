const Try = () => {
  return (
    <section className="p-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Wanna use CogniFile ?</h2>
        <p className="text-gray-400 mb-8 px-40">
          Découvrez notre gamme de services innovants, conçus pour vous accompagner à
          l&apos;organisation de vos fichiers. Notre équipe d&apos;experts est dédiée à simplifier
          et à renforcer votre expérience dans ce cadre.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-white text-cf-dark rounded-full px-8 py-3 font-bold text-lg">
            Try For free
          </button>
          <button className="bg-transparent border border-white text-white rounded-full px-8 py-3 font-bold text-lg">
            Sign in
          </button>
        </div>
      </div>
    </section>
  );
};
export default Try;
