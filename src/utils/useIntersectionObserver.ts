import { RefObject, useEffect, useState } from 'react';

const useIntersecionObserver = (target: RefObject<Element> | null): { isIntersecting: boolean } => {
	const [isIntersecting, setIntersecting] = useState(false);

	useEffect(() => {
		const handleObserver = (entities: IntersectionObserverEntry[]) => {
			setIntersecting(entities[0].isIntersecting);
		};

		const options = {
			root: null,
			rootMargin: '0px',
			threshold: 1.0,
		};

		const observer = new IntersectionObserver(handleObserver, options);

		if (target?.current) {
			observer.observe(target.current);
		}
	}, [target]);

	return { isIntersecting };
};

export default useIntersecionObserver;
