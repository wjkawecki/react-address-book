/* eslint-disable react/jsx-props-no-spreading */
import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import styles from './Modal.module.scss';
import close from '../../assets/close.svg';

const Modal: React.FC<ReactModal.Props> = ({ children, onRequestClose, ...rest }) => {
	const [appElement, setAppElement] = useState<HTMLElement | null>(null);

	useEffect(() => {
		setAppElement(document.getElementById('#root'));
	}, []);

	if (appElement) {
		ReactModal.setAppElement(appElement);
	}

	return (
		<ReactModal
			className={styles.base}
			overlayClassName={styles.overlay}
			ariaHideApp={!!appElement}
			onRequestClose={onRequestClose}
			{...rest}
		>
			<header className={styles.header}>
				<button type="button" title="Close modal" className={styles.close} onClick={onRequestClose}>
					<img src={close} alt="" />
				</button>
			</header>
			{children}
		</ReactModal>
	);
};

export default Modal;
