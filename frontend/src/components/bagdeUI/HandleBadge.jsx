const HandleBadge = ({ handle }) => (
  <span className="inline-block bg-gray-50 border border-gray-200 text-gray-700 font-mono text-xs px-2 py-1 rounded mr-2 mb-1">
    {handle}
  </span>
);

export default HandleBadge;

/* USE CASE

<HandleBadge key={hIdx} handle={handle} />

*/
