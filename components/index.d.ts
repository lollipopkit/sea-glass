import type * as React from 'react';
export type Tone = 'seafoam' | 'aqua' | 'cobalt' | 'lilac' | 'coral' | 'amber' | 'frost';
export type IconName = 'plus' | 'close' | 'search' | 'mic' | 'wave' | 'image' | 'layout' | 'folder' | 'sparkle' | 'share' | 'comment' | 'download' | 'edit' | 'more-vert' | 'check' | 'mail' | 'video' | 'dialpad' | 'speaker' | 'call-end' | 'more' | 'settings' | 'chevron' | 'chevron-down' | 'link' | 'refresh' | 'list' | 'grid' | 'globe';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { tone?: Tone; size?: 'sm' | 'md' | 'lg' | 'xl'; icon?: IconName; filled?: boolean; /** required when the button has an icon and no children */ label?: string }
export declare function Button(props: ButtonProps): React.ReactElement;
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { label: string; filled?: boolean; iconSize?: number; icon?: IconName; monogram?: string; tone?: Tone; size?: 'sm' | 'md' | 'lg'; variant?: 'glass' | 'bare' | 'inset' }
export declare function IconButton(props: IconButtonProps): React.ReactElement;
export interface SegmentedNavItem { id: string; label: string; icon?: IconName }
export interface SegmentedNavProps { items: SegmentedNavItem[]; value?: string; defaultValue?: string; onChange?: (id: string) => void; tone?: Tone; size?: 'md' | 'lg'; filled?: boolean; 'aria-label': string; className?: string }
export declare function SegmentedNav(props: SegmentedNavProps): React.ReactElement;
export interface PromptBarProps { placeholder?: string; value?: string; onChange?: (v: string) => void; onSubmit?: (v: string) => void; onAttach?: () => void; onMic?: () => void; onVoice?: () => void; tone?: Tone; attachLabel?: string; micLabel?: string; voiceLabel?: string; className?: string }
export declare function PromptBar(props: PromptBarProps): React.ReactElement;
export interface ChipProps { tone?: Tone; icon?: IconName; selected?: boolean; onClick?: () => void; children?: React.ReactNode; className?: string }
export declare function Chip(props: ChipProps): React.ReactElement;
export interface GlassCardProps { tone?: Tone; title?: string; footer?: React.ReactNode; children?: React.ReactNode; 'aria-label'?: string; className?: string }
export declare function GlassCard(props: GlassCardProps): React.ReactElement;
export interface MeterProps { value: number; label?: string; icon?: IconName; tone?: Tone; valueText?: string; warnAt?: number; dangerAt?: number; className?: string }
export declare function Meter(props: MeterProps): React.ReactElement;
export interface SparklineProps { data: number[]; label: string; tone?: Tone; height?: number; max?: number; min?: number; area?: boolean; className?: string }
export declare function Sparkline(props: SparklineProps): React.ReactElement;
export interface SliderProps { value?: number; defaultValue?: number; min?: number; max?: number; step?: number; onChange?: (value: number) => void; label?: string; 'aria-label'?: string; tone?: Tone; showValue?: boolean; format?: (value: number) => string; disabled?: boolean; id?: string; className?: string }
export declare function Slider(props: SliderProps): React.ReactElement;
export interface ScrollAreaProps { children?: React.ReactNode; 'aria-label'?: string; maxHeight?: number | string; height?: number | string; tone?: Tone; role?: string; tabIndex?: number; style?: React.CSSProperties; className?: string }
export declare function ScrollArea(props: ScrollAreaProps): React.ReactElement;
export interface ToolbarItem { id?: string; icon: IconName; label: string; onClick?: (e: React.MouseEvent) => void; disabled?: boolean; /** marks the button that opens the menu (a more-vert item without onClick is detected too) */ more?: boolean }
export interface ToolbarProps { items: ToolbarItem[]; /** actions shown only in the menu, below a divider */ menuItems?: ToolbarItem[]; closeLabel?: string; menuLabel?: string; filled?: boolean; 'aria-label': string; tone?: Tone; className?: string }
export declare function Toolbar(props: ToolbarProps): React.ReactElement;
export interface FabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { icon?: IconName; filled?: boolean; label?: string; tone?: Tone; size?: 'md' | 'lg'; children?: React.ReactNode }
export declare function Fab(props: FabProps): React.ReactElement;
export interface SwatchOption { id: string; color: string; label: string }
export interface SwatchPickerProps { options: SwatchOption[]; 'aria-label': string; value?: string; defaultValue?: string; onChange?: (id: string) => void; size?: 'md' | 'lg'; className?: string }
export declare function SwatchPicker(props: SwatchPickerProps): React.ReactElement;
export interface MenuItem { id?: string; icon?: IconName; label: string; onClick?: (e: React.MouseEvent) => void; disabled?: boolean; filled?: boolean }
export interface ToggleButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> { icon: IconName; label: string; /** makes it a menu button (for More): the menu grows out of it */ menuItems?: MenuItem[]; menuLabel?: string; menuTone?: Tone; pressed?: boolean; defaultPressed?: boolean; onChange?: (pressed: boolean) => void; toggle?: boolean; tone?: Tone; size?: 'sm' | 'md'; filled?: boolean }
export declare function ToggleButton(props: ToggleButtonProps): React.ReactElement;
export interface IconProps { name: IconName; filled?: boolean; size?: number; label?: string; className?: string }
export declare function Icon(props: IconProps): React.ReactElement;
export interface GlassParam { id: string; css: string; def: number; min: number; max: number; step: number; unit: '' | '%'; group: 'grain' | 'band' | 'light' | 'shadow' }
/** Sets glass parameters as CSS custom properties: numbers get the parameter's unit, null removes the override. Without an element the values go on :root; grain values always go on :root and redraw the grain. */
export declare function setParams(values: Record<string, number | string | null>, element?: HTMLElement): void;
export declare function getParams(element?: HTMLElement): Record<string, number>;
export declare function resetParams(element?: HTMLElement): void;
declare global { interface Window { SeaGlass: { Button: typeof Button; IconButton: typeof IconButton; SegmentedNav: typeof SegmentedNav; PromptBar: typeof PromptBar; Chip: typeof Chip; GlassCard: typeof GlassCard; Meter: typeof Meter; Sparkline: typeof Sparkline; Slider: typeof Slider; ScrollArea: typeof ScrollArea; Toolbar: typeof Toolbar; Fab: typeof Fab; SwatchPicker: typeof SwatchPicker; ToggleButton: typeof ToggleButton; Icon: typeof Icon; tones: Tone[]; params: GlassParam[]; setParams: typeof setParams; getParams: typeof getParams; resetParams: typeof resetParams } } }
