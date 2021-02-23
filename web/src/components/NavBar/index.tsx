import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { authFunctionalities } from '../../utilities/authentication';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		grow: {
			flexGrow: 1,
			color: theme.palette.common.white
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			'&:hover': {
				textDecoration: 'none',
			},
			display: 'none',
			fontWeight: 700,
			color: theme.palette.common.white,
			[theme.breakpoints.up('sm')]: {
				display: 'block',
			},
		},
		search: {
			position: 'relative',
			marginRight: theme.spacing(2),
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(3),
				width: 'auto',
			},
		},
		searchIcon: {
			padding: theme.spacing(0, 2),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: theme.palette.common.white
		},
		inputRoot: {
			color: theme.palette.common.black,
		},
		inputInput: {
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('md')]: {
				width: '20ch',
			},
		},
		sectionDesktop: {
			display: 'none',
			[theme.breakpoints.up('md')]: {
				display: 'flex',
			},
		},
		sectionMobile: {
			display: 'flex',
			[theme.breakpoints.up('md')]: {
				display: 'none',
			},
		},
		profileDropdownMenu: {
			marginTop: 30,
		},
		dropdownMenu: {
			marginTop: 30,
		},
		dropdownMenuItem: {
			padding: 15,
		},
		firstName: {
			lineHeight: '100%', alignSelf: 'center', fontWeight: 700,
			color: theme.palette.common.white
		}
	})
);

export interface PrimarySearchAppBarProps {
	title?: string;
}

// FIX THIS TO BE RECURSIVE
type iSubmenu = {
	nome: string;
	displayName: string;
	submenuItens?: iSubmenu[];
	onClick?(): any;
	disabled: boolean
};

export function PrimarySearchAppBar(props: PrimarySearchAppBarProps) {
	
	const classes = useStyles();
	const history = useHistory();

	const submenu: iSubmenu[] = [
		{
			nome: 'schedules-menu-item',
			displayName: 'Agendamento',
			disabled: true,
		},
		{
			nome: 'customers-menu-item',
			displayName: 'Clientes',			
			submenuItens: [
				{
					nome: 'customers-submenu-item-PF',
					displayName: 'PF',
					onClick: () => history.push('/customers/PF'),
					disabled: false,
				},
				{
					nome: 'customers-submenu-item-PJ',
					displayName: 'PJ',
					onClick: () => history.push('/customers/PJ'),
					disabled: false,
				}
			],
			disabled: false,
		},
		{
			nome: 'finances-menu-item',
			displayName: 'Financeiro',
			disabled: true,
		},
		{
			nome: 'medical-records-menu-item',
			displayName: 'Prontuário',
			disabled: true,
		},
		{
			nome: 'reports-menu-item',
			displayName: 'Relatórios',			
			disabled: true,
		},
		{
			nome: 'services-menu-item',
			displayName: 'Serviços',
			onClick: () => history.push('/services'),
			disabled: false,
		},
	];

	const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null);
	const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
	const [submenuAnchorEl, setSubmenuAnchorEl] = React.useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

	// Probably Hoist This
	const [notifications] = React.useState<number>(0);

	const [subMenuItens] = React.useState<iSubmenu[]>(submenu);

	const isProfileMenuOpen = Boolean(profileAnchorEl);
	const isMobileProfileMenuOpen = Boolean(mobileMoreAnchorEl);
	const isMenuOpen = Boolean(menuAnchorEl);
	const isSubmenuOpen = Boolean(submenuAnchorEl);

	const signOut = () => {
		authFunctionalities.signOut();
		history.push('/login');
	};

	const authObject = authFunctionalities.getAuthObject();

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setProfileAnchorEl(event.currentTarget);
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleProfileMenuClose = () => {
		setProfileAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleSubmenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setSubmenuAnchorEl(event.currentTarget);
	};

	const handleSubmenuClose = () => {
		setSubmenuAnchorEl(null);
	};

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMenuAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		handleSubmenuClose();
		setMenuAnchorEl(null);
	};

	const profileMenuId = 'primary-search-account-menu';
	const renderProfileMenu = (
		<Menu
			className={classes.profileDropdownMenu}
			anchorEl={profileAnchorEl}
			id={profileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={isProfileMenuOpen}
			onClose={handleProfileMenuClose}
		>
			<MenuItem onClick={handleProfileMenuClose}>Perfil</MenuItem>
			<MenuItem onClick={handleProfileMenuClose}>Gerenciamento</MenuItem>
			<MenuItem onClick={signOut}>Sair</MenuItem>
		</Menu>
	);

	const mobileProfileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileProfileMenu = (
		<Menu
			className={classes.profileDropdownMenu}
			anchorEl={mobileMoreAnchorEl}
			id={mobileProfileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={isMobileProfileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton aria-label='new notifications' color='secondary'>
					<Badge badgeContent={notifications} color='secondary'>
						{notifications > 0 ? <NotificationsActiveIcon /> : <NotificationsIcon />}
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='secondary'
				>
					<AccountCircle />
				</IconButton>
				<p>Perfil</p>
			</MenuItem>
		</Menu>
	);

	const menuId = 'primary-search-menu';
	const renderMenu = (
		<Menu
			className={classes.dropdownMenu}
			anchorEl={menuAnchorEl}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			{subMenuItens.map((smi) => {
				return (
					<MenuItem disabled={smi.disabled}
						key={smi.nome}
						id={smi.nome}
						className={classes.dropdownMenuItem}
						onClick={!smi.submenuItens ? smi.onClick : handleSubmenuOpen}
					>
						{smi.displayName} {smi.submenuItens && <ChevronRightIcon />}
					</MenuItem>
				);
			})}
		</Menu>
	);

	const submenuId = 'primary-search-submenu';
	const renderSubmenu = (
		<Menu
			style={{ marginLeft: submenuAnchorEl ? submenuAnchorEl.clientWidth : 164 }}
			anchorEl={submenuAnchorEl}
			id={submenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isSubmenuOpen}
			onClose={handleSubmenuClose}
		>
			{/* Rewrite this */}
			{subMenuItens.map((sm) => {
				if (submenuAnchorEl && sm.nome === submenuAnchorEl.id && sm.submenuItens) {
					return sm.submenuItens.map((smi) => {
						return (
							<MenuItem key={smi.nome} className={classes.dropdownMenuItem} onClick={smi.onClick} disabled={smi.disabled}>
								{smi.displayName}
							</MenuItem>
						);
					});
				} else {
					return '';
				}
			})}
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						edge='start'
						className={classes.menuButton}
						color='secondary'
						aria-label='open menu'
						onClick={handleMenuOpen}
					>
						<MenuIcon />
					</IconButton>

					<Link className={classes.title} variant='h5' noWrap component={RouterLink} to='/'>
						{props.title}
					</Link>

					<div className={classes.grow} />
					{/* <div className={classes.search}>
						<CollapsibleSearchBar color='secondary' />
					</div> */}
					<div className={classes.sectionDesktop}>
						<Typography className={classes.firstName}>
							Olá, {authObject?.user?.firstName}
						</Typography>
						<IconButton
							edge='end'
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='secondary'
						>
							<AccountCircle />
						</IconButton>
						<IconButton aria-label='new notifications' color='secondary'>
							<Badge badgeContent={notifications} color='secondary'>
								{notifications > 0 ? <NotificationsActiveIcon /> : <NotificationsIcon />}
							</Badge>
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label='show more'
							aria-controls={mobileProfileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='secondary'
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileProfileMenu}
			{renderProfileMenu}
			{renderMenu}
			{renderSubmenu}
		</div>
	);
}
