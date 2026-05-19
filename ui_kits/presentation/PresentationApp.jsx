// PresentationApp — assembles the canonical sequence from a data object.
function PresentationApp({ data }) {
  return (
    <div className="la-deck">
      <Cover data={data} />
      <Biography data={data} />
      <Quote data={data} />
      {data.works.flatMap((work, i) => {
        const key = `w${i}`;
        return [
          <Work    key={`${key}-work`}    data={data} work={work} />,
          <Closeup key={`${key}-closeup`} data={data} work={work} />,
          <Detail  key={`${key}-detail`}  work={work} />,
          work.notes && work.notes.length
            ? <Notes key={`${key}-notes`} work={work} />
            : null,
        ].filter(Boolean);
      })}
      <End />
    </div>
  );
}

window.PresentationApp = PresentationApp;
