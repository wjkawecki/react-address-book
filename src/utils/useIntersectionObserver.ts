import { RefObject, useEffect, useState } from 'react';

const useIntersecionObserver = (
	target: RefObject<Element> | null,
	options?: IntersectionObserverInit
): { isIntersecting: boolean } => {
	const [isIntersecting, setIntersecting] = useState(false);

	useEffect(() => {
		const handleObserver = (entities: IntersectionObserverEntry[]) => {
			setIntersecting(entities[0].isIntersecting);
		};

		const observer = new IntersectionObserver(handleObserver, options);

		if (target?.current) {
			observer.observe(target.current);
		}
	}, [target, options]);

	return { isIntersecting };
};

export default useIntersecionObserver;
