/* eslint-disable react/jsx-props-no-spreading */
import { InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.scss';
import checkmark from '../../../assets/checkmark.svg';

interface CheckboxType extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	label: string;
}

const Checkbox: React.FC<CheckboxType> = ({ id, label, ...rest }): React.ReactElement => {
	return (
		<label className={styles.base} htmlFor={id}>
			<span className={styles.checkboxInput}>
				<input type="checkbox" id={id} {...rest} />
				<span className={styles.checkboxControl}>
					<img src={checkmark} alt="" />
				</span>
			</span>
			<span className={styles.checkboxLabel}>{label}</span>
		</label>
	);
};

export default Checkbox;
