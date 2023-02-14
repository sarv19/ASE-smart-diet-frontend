import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { Tooltip } from 'antd';
  
const HomeImg = () => (
    <Tooltip placement="right" title={'Home'}>
        <img className='custom-logo' src="https://img.icons8.com/windows/64/FFFFFF/home-page.png"/>
    </Tooltip>
);


const MenuImg = () => (
    <Tooltip placement="right" title={'Menu'}>
        <img className='custom-logo' src="https://img.icons8.com/external-becris-lineal-becris/64/FFFFFF/external-diet-literary-genres-becris-lineal-becris.png"/>
    </Tooltip>
);

const ReportImg = () => (
    <Tooltip placement="right" title={'Summary'}>
        <img className='custom-logo' src="https://img.icons8.com/pastel-glyph/64/FFFFFF/graph-report--v3.png"/>
    </Tooltip>
);

const DietImg = () => (
    <Tooltip placement="right" title={'Your diet'}>
        <img className='custom-logo' src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/FFFFFF/external-diet-diet-and-nutrition-flatart-icons-outline-flatarticons-1.png"/>
    </Tooltip>
);

const SettingImg = () => (
    <Tooltip placement="right" title={'Setting'}>
        <img className='custom-logo' src="https://img.icons8.com/wired/64/FFFFFF/settings.png"/>
    </Tooltip>
);

const CloseImg = () => (
    <Tooltip placement="right" title={'Close'}>
        <img src="https://img.icons8.com/ios-filled/50/00967e/delete-sign--v1.png"/>
    </Tooltip>
);

const HomeIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={HomeImg} {...props} />
);

const MenuIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={MenuImg} {...props} />
);

const ReportIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ReportImg} {...props} />
);

const DietIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={DietImg} {...props} />
);

const SettingIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={SettingImg} {...props} />
);

const CloseIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={CloseImg} {...props} />
);

export {
    HomeIcon,
    MenuIcon,
    ReportIcon,
    DietIcon,
    SettingIcon,
    CloseIcon
}