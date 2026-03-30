import { useState, type ReactNode } from "react";
import {
  IconBell,
  IconCheck,
  IconCopy,
  IconMenu2,
  IconPlayerPlay,
  IconSettings,
  IconSparkles,
  IconTrash,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Checkbox,
  ContextMenu,
  Divider,
  Flex,
  Grid,
  Group,
  Menu,
  Modal,
  MultiSelect,
  NumberInput,
  Paper,
  Popover,
  Portal,
  ScrollArea,
  Select,
  Slider,
  Stack,
  Switch,
  Text,
  TextArea,
  TextInput,
  Tooltip,
  Title,
} from "../package";

const actionVariants = [
  "default",
  "filled",
  "light",
  "outline",
  "subtle",
  "transparent",
] as const;

const actionSizes = ["xs", "sm", "md", "lg", "xl"] as const;
const badgeVariants = ["default", "filled", "light", "outline", "dot", "transparent"] as const;
const badgeSizes = ["xs", "sm", "md", "lg", "xl"] as const;
const fieldVariants = ["default", "filled", "light", "outline", "subtle", "transparent"] as const;
const fieldSizes = ["xs", "sm", "md", "lg", "xl"] as const;
const paperShadows = ["xs", "sm", "md", "lg"] as const;
const titleOrders = [1, 2, 3, 4, 5, 6] as const;
const radiusValues = ["xs", "sm", "md", "lg", "xl", 16] as const;
const tooltipPositions = ["top", "right", "bottom", "left"] as const;
const popoverPositions = ["top", "bottom-start", "bottom-end", "right"] as const;
const menuPositions = ["bottom-start", "bottom-end", "top-end"] as const;

const selectData = [
  { label: "Patrol Alpha", value: "alpha" },
  { label: "Medic Bravo", value: "bravo" },
  { label: "Dispatch Charlie", value: "charlie" },
  { label: "Support Delta", value: "delta" },
];

const multiSelectData = [
  { label: "Map overlay", value: "map" },
  { label: "Dispatch alerts", value: "alerts" },
  { label: "Vehicle telemetry", value: "telemetry" },
  { label: "Admin controls", value: "admin" },
  { label: "Inventory sync", value: "inventory" },
];

const activityFeed = [
  "Dispatch sync finished with zero dropped events.",
  "Unit Bravo-2 requested backup near Vespucci Boulevard.",
  "Telemetry sampler switched to a lower frequency profile.",
  "Permissions overlay was granted for the current session.",
  "Scene marker persisted and replicated to connected clients.",
  "Priority notifications were pinned to the HUD queue.",
  "Traffic collision report was assigned to Medic Bravo.",
  "Radio state changed to encrypted fallback channel.",
];

type SectionProps = {
  children: ReactNode;
  description: string;
  title: string;
};

const ShowcaseSection = ({ children, description, title }: SectionProps) => {
  return (
    <Paper p="lg" radius="xl" shadow="md" withBorder>
      <Stack gap="md">
        <Stack gap="xs">
          <Text color="#8da2bb" size="sm">
            Component showcase
          </Text>
          <Title color="#ffffff" order={3}>
            {title}
          </Title>
          <Text color="#b8c5d6" size="sm">
            {description}
          </Text>
        </Stack>
        <Divider />
        {children}
      </Stack>
    </Paper>
  );
};

const VariantBadge = ({ children }: { children: ReactNode }) => {
  return (
    <Badge radius="xl" size="xs" variant="default">
      {children}
    </Badge>
  );
};

const App = () => {
  const [menuChannel, setMenuChannel] = useState("beta");
  const [contextMode, setContextMode] = useState("all");
  const [menuCompact, setMenuCompact] = useState(true);
  const [menuTimestamps, setMenuTimestamps] = useState(false);
  const [contextPing, setContextPing] = useState(true);
  const [portalVisible, setPortalVisible] = useState(true);
  const [modalSize, setModalSize] = useState<null | string>(null);
  const [targetedModalOpen, setTargetedModalOpen] = useState(false);

  return (
    <>
      <Box color="#f8fafc" p="xl">
        <Stack gap="xl">
          <Paper p="xl" radius="xl" shadow="lg" withBorder>
            <Stack gap="lg">
              <Flex align="center" gap="sm" justify="space-between" wrap="wrap">
                <Group gap="sm">
                  <Badge variant="light">Lorewave UI</Badge>
                  <Badge variant="dot">Full component showcase</Badge>
                </Group>
                <Flex gap="sm" wrap="wrap">
                  <Button leftSection={<IconSparkles size={16} stroke={1.8} />} onClick={() => setModalSize("26rem")} variant="filled">
                    Open modal
                  </Button>
                  <Button onClick={() => setPortalVisible((current) => !current)} variant="outline">
                    Toggle portal
                  </Button>
                </Flex>
              </Flex>

              <Stack gap="sm">
                <Title color="#ffffff" order={1}>
                  Demo przebudowane pod sekcje per komponent
                </Title>
                <Text color="#b8c5d6" fw={500} size="lg">
                  Kazdy komponent ma osobny blok. Tam gdzie API to wspiera,
                  pokazane sa warianty, rozmiary, radiusy i glowne tryby uzycia.
                </Text>
              </Stack>

              <Grid gap="md" minChildWidth={220}>
                <Paper p="md" radius="lg" shadow="xs">
                  <Stack gap="xs">
                    <Text color="#8da2bb" size="sm">
                      Components
                    </Text>
                    <Title color="#ffffff" order={4}>
                      25+ blokow demo
                    </Title>
                  </Stack>
                </Paper>
                <Paper p="md" radius="lg" shadow="xs">
                  <Stack gap="xs">
                    <Text color="#8da2bb" size="sm">
                      Coverage
                    </Text>
                    <Title color="#ffffff" order={4}>
                      Variants + sizes + radius
                    </Title>
                  </Stack>
                </Paper>
                <Paper p="md" radius="lg" shadow="xs">
                  <Stack gap="xs">
                    <Text color="#8da2bb" size="sm">
                      Overlays
                    </Text>
                    <Title color="#ffffff" order={4}>
                      Tooltip / Popover / Menu / Modal
                    </Title>
                  </Stack>
                </Paper>
              </Grid>
            </Stack>
          </Paper>

          <Grid gap="lg" minChildWidth={340}>
            <ShowcaseSection
              description="Box jest najnizszym wrapperem dla spacing props, kolorow tla i radiusa."
              title="Box"
            >
              <Grid gap="sm" minChildWidth={150}>
                {radiusValues.map((radius) => (
                  <Box
                    bg="rgba(59, 130, 246, 0.16)"
                    key={String(radius)}
                    p="md"
                    radius={radius}
                    style={{ border: "1px solid rgba(125, 211, 252, 0.24)" }}
                  >
                    <Stack gap="xs">
                      <VariantBadge>radius={String(radius)}</VariantBadge>
                      <Text fw={600}>Box surface</Text>
                      <Text color="#8da2bb" size="sm">
                        p=&quot;md&quot; + bg + radius
                      </Text>
                    </Stack>
                  </Box>
                ))}
              </Grid>
            </ShowcaseSection>

            <ShowcaseSection
              description="Flex pokazuje osie, justowanie i zawijanie elementow."
              title="Flex"
            >
              <Stack gap="sm">
                <Flex align="center" gap="sm" justify="space-between" p="sm" style={{ border: "1px solid rgba(148, 163, 184, 0.18)", borderRadius: "0.75rem" }}>
                  <VariantBadge>space-between</VariantBadge>
                  <Badge variant="filled">Center</Badge>
                  <Badge variant="light">Aligned</Badge>
                </Flex>
                <Flex gap="sm" justify="flex-start" wrap="wrap">
                  {actionVariants.map((variant) => (
                    <Badge key={variant} variant={variant === "subtle" ? "default" : variant === "transparent" ? "transparent" : "light"}>
                      {variant}
                    </Badge>
                  ))}
                </Flex>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="Grid obsluguje stale kolumny i auto-fit przez minChildWidth."
              title="Grid"
            >
              <Stack gap="md">
                <Grid cols={3} gap="sm">
                  {[1, 2, 3].map((item) => (
                    <Paper key={`grid-fixed-${item}`} p="sm" radius="md" shadow="xs">
                      Fixed {item}
                    </Paper>
                  ))}
                </Grid>
                <Grid gap="sm" minChildWidth={120}>
                  {[1, 2, 3, 4].map((item) => (
                    <Paper key={`grid-auto-${item}`} p="sm" radius="md" shadow="xs">
                      Auto {item}
                    </Paper>
                  ))}
                </Grid>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="Group to poziomy helper oparty o Flex z domyslnym align=center."
              title="Group"
            >
              <Stack gap="sm">
                <Group gap="sm">
                  <Badge variant="default">Alpha</Badge>
                  <Badge variant="light">Bravo</Badge>
                  <Badge variant="outline">Charlie</Badge>
                </Group>
                <Group gap="lg">
                  <Button size="sm" variant="default">
                    Left
                  </Button>
                  <Button size="sm" variant="filled">
                    Middle
                  </Button>
                  <Button size="sm" variant="outline">
                    Right
                  </Button>
                </Group>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="Stack ustawia elementy pionowo i pokazuje roznice w gap."
              title="Stack"
            >
              <Grid gap="sm" minChildWidth={140}>
                {(["xs", "sm", "md", "lg"] as const).map((gap) => (
                  <Paper key={gap} p="sm" radius="md" shadow="xs">
                    <Stack gap={gap}>
                      <VariantBadge>gap={gap}</VariantBadge>
                      <Badge variant="light">One</Badge>
                      <Badge variant="light">Two</Badge>
                      <Badge variant="light">Three</Badge>
                    </Stack>
                  </Paper>
                ))}
              </Grid>
            </ShowcaseSection>

            <ShowcaseSection
              description="Paper pokazuje wszystkie cienie, border i roznice promieni."
              title="Paper"
            >
              <Grid gap="sm" minChildWidth={160}>
                {paperShadows.map((shadow) => (
                  <Paper key={shadow} p="md" radius="lg" shadow={shadow} withBorder>
                    <Stack gap="xs">
                      <VariantBadge>shadow={shadow}</VariantBadge>
                      <Text fw={600}>Panel surface</Text>
                      <Text color="#8da2bb" size="sm">
                        withBorder + radius
                      </Text>
                    </Stack>
                  </Paper>
                ))}
              </Grid>
            </ShowcaseSection>

            <ShowcaseSection
              description="Text ma skale od xs do xl, alignment, truncation i line clamp."
              title="Text"
            >
              <Stack gap="sm">
                {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
                  <Text color="#dbeafe" key={size} size={size}>
                    Text size {size}: quick response overlay content
                  </Text>
                ))}
                <Text color="#8da2bb" lineClamp={2} style={{ maxWidth: "20rem" }}>
                  Long text sample for lineClamp. This sentence should wrap and then cut
                  after the second line to show the multiline truncation behavior.
                </Text>
                <Text color="#7dd3fc" style={{ maxWidth: "12rem" }} truncate>
                  Truncate sample with a very long dispatch event name that should cut.
                </Text>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="Title eksponuje wszystkie poziomy naglowkow od order 1 do 6."
              title="Title"
            >
              <Stack gap="sm">
                {titleOrders.map((order) => (
                  <Title color="#ffffff" key={order} order={order}>
                    Title order {order}
                  </Title>
                ))}
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="Divider wspiera poziomy i pionowy wariant oraz etykiety."
              title="Divider"
            >
              <Stack gap="md">
                <Divider />
                <Divider label="label" />
                <Flex align="stretch" gap="md">
                  <Text>Left</Text>
                  <Divider orientation="vertical" />
                  <Text>Right</Text>
                </Flex>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="Badge pokazuje wszystkie warianty, skale i rozne radiusy."
              title="Badge"
            >
              <Stack gap="md">
                <Flex gap="sm" wrap="wrap">
                  {badgeVariants.map((variant) => (
                    <Badge key={variant} variant={variant}>
                      {variant}
                    </Badge>
                  ))}
                </Flex>
                <Flex align="center" gap="sm" wrap="wrap">
                  {badgeSizes.map((size) => (
                    <Badge key={size} size={size} variant="light">
                      size {size}
                    </Badge>
                  ))}
                </Flex>
                <Flex gap="sm" wrap="wrap">
                  {radiusValues.map((radius) => (
                    <Badge key={String(radius)} radius={radius} variant="outline">
                      radius {String(radius)}
                    </Badge>
                  ))}
                </Flex>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="Button pokazuje komplet wariantow, wszystkie size i radius."
              title="Button"
            >
              <Stack gap="md">
                <Flex gap="sm" wrap="wrap">
                  {actionVariants.map((variant) => (
                    <Button key={variant} variant={variant}>
                      {variant}
                    </Button>
                  ))}
                </Flex>
                <Flex align="center" gap="sm" wrap="wrap">
                  {actionSizes.map((size) => (
                    <Button key={size} size={size} variant="filled">
                      {size}
                    </Button>
                  ))}
                </Flex>
                <Flex align="center" gap="sm" wrap="wrap">
                  {radiusValues.map((radius) => (
                    <Button key={String(radius)} radius={radius} variant="outline">
                      radius {String(radius)}
                    </Button>
                  ))}
                </Flex>
                <Flex gap="sm" wrap="wrap">
                  <Button leftSection={<IconPlayerPlay size={16} stroke={1.8} />} variant="light">
                    Left section
                  </Button>
                  <Button rightSection={<IconMenu2 size={16} stroke={1.8} />} variant="outline">
                    Right section
                  </Button>
                  <Button loading variant="transparent">
                    Loading
                  </Button>
                </Flex>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="ActionIcon korzysta z tego samego zestawu size, variant i radius co Button."
              title="ActionIcon"
            >
              <Stack gap="md">
                <Flex align="center" gap="sm" wrap="wrap">
                  {actionVariants.map((variant) => (
                    <ActionIcon aria-label={variant} key={variant} variant={variant}>
                      <IconBell size={18} stroke={1.8} />
                    </ActionIcon>
                  ))}
                </Flex>
                <Flex align="center" gap="sm" wrap="wrap">
                  {actionSizes.map((size) => (
                    <ActionIcon aria-label={size} key={size} size={size} variant="filled">
                      <IconSettings size={18} stroke={1.8} />
                    </ActionIcon>
                  ))}
                </Flex>
                <Flex align="center" gap="sm" wrap="wrap">
                  {radiusValues.map((radius) => (
                    <ActionIcon aria-label={String(radius)} key={String(radius)} radius={radius} variant="outline">
                      <IconSparkles size={18} stroke={1.8} />
                    </ActionIcon>
                  ))}
                </Flex>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="Tooltip prezentuje pozycjonowanie overlaya z roznych stron targetu."
              title="Tooltip"
            >
              <Flex gap="sm" wrap="wrap">
                {tooltipPositions.map((position) => (
                  <Tooltip key={position} label={`Tooltip ${position}`} position={position}>
                    <Button size="sm" variant="default">
                      {position}
                    </Button>
                  </Tooltip>
                ))}
              </Flex>
            </ShowcaseSection>

            <ShowcaseSection
              description="Popover pokazuje kompozycje Target + Dropdown i kilka pozycji."
              title="Popover"
            >
              <Flex gap="sm" wrap="wrap">
                {popoverPositions.map((position) => (
                  <Popover key={position} position={position} width={220}>
                    <Popover.Target>
                      <Button size="sm" variant="outline">
                        {position}
                      </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Stack gap="xs">
                        <Text fw={600}>Popover {position}</Text>
                        <Text color="#8da2bb" size="sm">
                          Shared portal + overlay positioning.
                        </Text>
                      </Stack>
                    </Popover.Dropdown>
                  </Popover>
                ))}
              </Flex>
            </ShowcaseSection>

            <ShowcaseSection
              description="Modal dostaje rozne szerokosci i moze byc renderowany globalnie albo do wskazanego targetu, np. target=#modal-target."
              title="Modal"
            >
              <Stack gap="md">
                <Flex gap="sm" wrap="wrap">
                  {[
                    { label: "size 26rem", value: "26rem" },
                    { label: "size 34rem", value: "34rem" },
                    { label: "size 46rem", value: "46rem" },
                  ].map((preset) => (
                    <Button key={preset.value} onClick={() => setModalSize(preset.value)} variant="filled">
                      {preset.label}
                    </Button>
                  ))}
                  <Button onClick={() => setTargetedModalOpen(true)} variant="outline">
                    Open target modal
                  </Button>
                </Flex>

                <Box
                  id="modal-target"
                  p="md"
                  style={{
                    position: "relative",
                    minHeight: "18rem",
                    border: "1px dashed rgba(125, 211, 252, 0.28)",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    background: "rgba(15, 23, 42, 0.32)",
                  }}
                >
                  <Stack gap="xs">
                    <VariantBadge>target=&quot;#modal-target&quot;</VariantBadge>
                    <Text fw={600}>Embedded modal host</Text>
                    <Text color="#8da2bb" size="sm">
                      Ten kontener ma `position: relative`, wiec modal moze zostac zamontowany lokalnie zamiast do `document.body`.
                    </Text>
                  </Stack>
                </Box>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="Menu pokazuje kompozycje compound components, checkboxy, radio i submenu."
              title="Menu"
            >
              <Flex gap="sm" wrap="wrap">
                {menuPositions.map((position) => (
                  <Menu key={position} position={position} width={240}>
                    <Menu.Target>
                      <Button size="sm" variant="outline">
                        {position}
                      </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Label>Dispatch actions</Menu.Label>
                      <Menu.Item leftSection={<IconPlayerPlay size={16} stroke={1.8} />}>
                        Open route
                      </Menu.Item>
                      <Menu.Submenu
                        description="Nested options"
                        label="Settings"
                        leftSection={<IconSettings size={16} stroke={1.8} />}
                      >
                        <Menu.CheckboxItem checked={menuCompact} onCheckedChange={setMenuCompact}>
                          Compact overlays
                        </Menu.CheckboxItem>
                        <Menu.CheckboxItem checked={menuTimestamps} onCheckedChange={setMenuTimestamps}>
                          Show timestamps
                        </Menu.CheckboxItem>
                        <Menu.Divider />
                        <Menu.RadioGroup onValueChange={setMenuChannel} value={menuChannel}>
                          <Menu.Label>Channel</Menu.Label>
                          <Menu.RadioItem value="alpha">Alpha</Menu.RadioItem>
                          <Menu.RadioItem value="beta">Beta</Menu.RadioItem>
                        </Menu.RadioGroup>
                      </Menu.Submenu>
                      <Menu.Divider />
                      <Menu.Item danger leftSection={<IconTrash size={16} stroke={1.8} />}>
                        Delete preset
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                ))}
              </Flex>
            </ShowcaseSection>

            <ShowcaseSection
              description="ContextMenu otwiera overlay prawym przyciskiem myszy na osobnym obszarze."
              title="ContextMenu"
            >
              <ContextMenu width={240}>
                <ContextMenu.Target>
                  <Paper p="lg" radius="lg" shadow="xs" withBorder>
                    <Stack gap="xs">
                      <Text fw={600}>Right click area</Text>
                      <Text color="#8da2bb" size="sm">
                        Kliknij prawym przyciskiem, aby pokazac menu kontekstowe.
                      </Text>
                    </Stack>
                  </Paper>
                </ContextMenu.Target>
                <ContextMenu.Dropdown>
                  <ContextMenu.Item leftSection={<IconCopy size={16} stroke={1.8} />}>
                    Copy overlay id
                  </ContextMenu.Item>
                  <ContextMenu.Submenu label="Notifications" leftSection={<IconBell size={16} stroke={1.8} />}>
                    <ContextMenu.CheckboxItem checked={contextPing} onCheckedChange={setContextPing}>
                      Enable ping
                    </ContextMenu.CheckboxItem>
                    <ContextMenu.RadioGroup onValueChange={setContextMode} value={contextMode}>
                      <ContextMenu.Label>Mode</ContextMenu.Label>
                      <ContextMenu.RadioItem value="all">All</ContextMenu.RadioItem>
                      <ContextMenu.RadioItem value="priority">Priority only</ContextMenu.RadioItem>
                    </ContextMenu.RadioGroup>
                  </ContextMenu.Submenu>
                  <ContextMenu.Divider label="Danger zone" />
                  <ContextMenu.Item danger leftSection={<IconTrash size={16} stroke={1.8} />}>
                    Clear HUD state
                  </ContextMenu.Item>
                </ContextMenu.Dropdown>
              </ContextMenu>
            </ShowcaseSection>

            <ShowcaseSection
              description="Portal pozwala wyrenderowac element poza glowna struktura demo."
              title="Portal"
            >
              <Stack gap="sm">
                <Text color="#8da2bb" size="sm">
                  Uzyj przycisku w hero albo ponizej, aby zamontowac portaled badge w rogu ekranu.
                </Text>
                <Flex gap="sm" wrap="wrap">
                  <Button onClick={() => setPortalVisible(true)} variant="filled">
                    Show portal
                  </Button>
                  <Button onClick={() => setPortalVisible(false)} variant="outline">
                    Hide portal
                  </Button>
                </Flex>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="ScrollArea ma wlasny viewport, custom thumb i offset pod scrollbar."
              title="ScrollArea"
            >
              <Grid gap="md" minChildWidth={220}>
                <Box>
                  <Text color="#8da2bb" size="sm">
                    scrollOffset=false
                  </Text>
                  <ScrollArea height={220} mt="sm">
                    <Stack gap="sm">
                      {activityFeed.map((entry) => (
                        <Paper key={`feed-plain-${entry}`} p="sm" radius="md" shadow="xs">
                          <Text size="sm">{entry}</Text>
                        </Paper>
                      ))}
                    </Stack>
                  </ScrollArea>
                </Box>
                <Box>
                  <Text color="#8da2bb" size="sm">
                    scrollOffset=true
                  </Text>
                  <ScrollArea height={220} mt="sm" scrollOffset scrollbarSize={14}>
                    <Stack gap="sm">
                      {activityFeed.map((entry) => (
                        <Paper key={`feed-offset-${entry}`} p="sm" radius="md" shadow="xs">
                          <Text size="sm">{entry}</Text>
                        </Paper>
                      ))}
                    </Stack>
                  </ScrollArea>
                </Box>
              </Grid>
            </ShowcaseSection>

            <ShowcaseSection
              description="TextInput pokazuje wszystkie field variants, rozmiary oraz radius."
              title="TextInput"
            >
              <Stack gap="md">
                <Grid gap="sm" minChildWidth={220}>
                  {fieldVariants.map((variant) => (
                    <TextInput
                      defaultValue={variant}
                      key={variant}
                      label={`variant ${variant}`}
                      placeholder="Enter value"
                      variant={variant}
                    />
                  ))}
                </Grid>
                <Grid gap="sm" minChildWidth={180}>
                  {fieldSizes.map((size) => (
                    <TextInput
                      key={size}
                      label={`size ${size}`}
                      placeholder="Scale"
                      size={size}
                      variant="filled"
                    />
                  ))}
                </Grid>
                <Grid gap="sm" minChildWidth={180}>
                  {radiusValues.map((radius) => (
                    <TextInput
                      key={String(radius)}
                      label={`radius ${String(radius)}`}
                      placeholder="Rounded field"
                      radius={radius}
                      variant="outline"
                    />
                  ))}
                </Grid>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="NumberInput pokazuje warianty, skale, radius i opcjonalne controls."
              title="NumberInput"
            >
              <Stack gap="md">
                <Grid gap="sm" minChildWidth={220}>
                  {fieldVariants.map((variant) => (
                    <NumberInput
                      defaultValue={42}
                      key={variant}
                      label={`variant ${variant}`}
                      step={1}
                      variant={variant}
                      withControls={variant !== "transparent"}
                    />
                  ))}
                </Grid>
                <Grid gap="sm" minChildWidth={180}>
                  {fieldSizes.map((size) => (
                    <NumberInput
                      defaultValue={12}
                      key={size}
                      label={`size ${size}`}
                      size={size}
                      variant="filled"
                    />
                  ))}
                </Grid>
                <Grid gap="sm" minChildWidth={180}>
                  {radiusValues.map((radius) => (
                    <NumberInput
                      defaultValue={24}
                      key={String(radius)}
                      label={`radius ${String(radius)}`}
                      radius={radius}
                      variant="outline"
                    />
                  ))}
                </Grid>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="TextArea pokazuje warianty i wielolinijkowe pole bez osobnej sekcji size."
              title="TextArea"
            >
              <Stack gap="md">
                <Grid gap="sm" minChildWidth={240}>
                  {fieldVariants.map((variant) => (
                    <TextArea
                      defaultValue="Longer multiline sample"
                      key={variant}
                      label={`variant ${variant}`}
                      rows={3}
                      variant={variant}
                    />
                  ))}
                </Grid>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="Select pokazuje warianty, size, radius i tryb searchable."
              title="Select"
            >
              <Stack gap="md">
                <Grid gap="sm" minChildWidth={220}>
                  {fieldVariants.map((variant) => (
                    <Select
                      data={selectData}
                      defaultValue="alpha"
                      key={variant}
                      label={`variant ${variant}`}
                      searchable
                      variant={variant}
                    />
                  ))}
                </Grid>
                <Grid gap="sm" minChildWidth={180}>
                  {fieldSizes.map((size) => (
                    <Select
                      data={selectData}
                      defaultValue="bravo"
                      key={size}
                      label={`size ${size}`}
                      size={size}
                      variant="filled"
                    />
                  ))}
                </Grid>
                <Grid gap="sm" minChildWidth={180}>
                  {radiusValues.map((radius) => (
                    <Select
                      data={selectData}
                      defaultValue="charlie"
                      key={String(radius)}
                      label={`radius ${String(radius)}`}
                      radius={radius}
                      variant="outline"
                    />
                  ))}
                </Grid>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="MultiSelect prezentuje skale, warianty, radius i aktywne pillsy."
              title="MultiSelect"
            >
              <Stack gap="md">
                <Grid gap="sm" minChildWidth={220}>
                  {fieldVariants.map((variant) => (
                    <MultiSelect
                      data={multiSelectData}
                      defaultValue={["map", "alerts"]}
                      key={variant}
                      label={`variant ${variant}`}
                      searchable
                      variant={variant}
                    />
                  ))}
                </Grid>
                <Grid gap="sm" minChildWidth={180}>
                  {fieldSizes.map((size) => (
                    <MultiSelect
                      data={multiSelectData}
                      defaultValue={["telemetry"]}
                      key={size}
                      label={`size ${size}`}
                      size={size}
                      variant="light"
                    />
                  ))}
                </Grid>
                <Grid gap="sm" minChildWidth={180}>
                  {radiusValues.map((radius) => (
                    <MultiSelect
                      data={multiSelectData}
                      defaultValue={["admin", "inventory"]}
                      key={String(radius)}
                      label={`radius ${String(radius)}`}
                      radius={radius}
                      variant="outline"
                    />
                  ))}
                </Grid>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="Checkbox wspiera warianty, skale i layout z opisem oraz hintem."
              title="Checkbox"
            >
              <Stack gap="md">
                <Grid gap="sm" minChildWidth={220}>
                  {fieldVariants.map((variant) => (
                    <Checkbox
                      defaultChecked
                      description="Checkbox description"
                      key={variant}
                      label={`variant ${variant}`}
                      variant={variant}
                    />
                  ))}
                </Grid>
                <Grid gap="sm" minChildWidth={180}>
                  {fieldSizes.map((size) => (
                    <Checkbox
                      defaultChecked={size !== "xs"}
                      hint="toggle"
                      key={size}
                      label={`size ${size}`}
                      size={size}
                      variant="outline"
                    />
                  ))}
                </Grid>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="Switch pokazuje field variants, sizes i zrodla label/hint."
              title="Switch"
            >
              <Stack gap="md">
                <Grid gap="sm" minChildWidth={220}>
                  {fieldVariants.map((variant) => (
                    <Switch
                      defaultChecked={variant !== "transparent"}
                      description="Switch description"
                      key={variant}
                      label={`variant ${variant}`}
                      variant={variant}
                    />
                  ))}
                </Grid>
                <Grid gap="sm" minChildWidth={180}>
                  {fieldSizes.map((size) => (
                    <Switch
                      defaultChecked={size === "md" || size === "lg" || size === "xl"}
                      hint="ui"
                      key={size}
                      label={`size ${size}`}
                      size={size}
                      variant="filled"
                    />
                  ))}
                </Grid>
              </Stack>
            </ShowcaseSection>

            <ShowcaseSection
              description="Slider ma te same warianty i size co pola formularza."
              title="Slider"
            >
              <Stack gap="md">
                <Grid gap="sm" minChildWidth={220}>
                  {fieldVariants.map((variant, index) => (
                    <Slider
                      defaultValue={20 + index * 12}
                      key={variant}
                      label={`variant ${variant}`}
                      max={100}
                      min={0}
                      variant={variant}
                    />
                  ))}
                </Grid>
                <Grid gap="sm" minChildWidth={180}>
                  {fieldSizes.map((size, index) => (
                    <Slider
                      defaultValue={15 + index * 10}
                      key={size}
                      label={`size ${size}`}
                      max={100}
                      min={0}
                      size={size}
                      variant="light"
                    />
                  ))}
                </Grid>
              </Stack>
            </ShowcaseSection>
          </Grid>
        </Stack>
      </Box>

      {portalVisible && (
        <Portal>
          <Box
            bg="rgba(59, 130, 246, 0.88)"
            color="#eff6ff"
            p="sm"
            radius="xl"
            style={{ position: "fixed", right: "1rem", top: "1rem", zIndex: 1500 }}
          >
            <Group gap="sm">
              <IconCheck size={16} stroke={2} />
              <Text as="span" fw={700} size="sm">
                Portal mounted
              </Text>
            </Group>
          </Box>
        </Portal>
      )}

      <Modal
        description="Ten modal sluzy jako sekcja demonstracyjna dla size, scrolla i dowolnej zawartosci."
        onChange={(opened) => {
          if (!opened) {
            setModalSize(null);
          }
        }}
        opened={modalSize !== null}
        size={modalSize ?? "32rem"}
        title={`Modal showcase ${modalSize ?? "32rem"}`}
      >
        <Stack gap="lg">
          <Flex gap="sm" wrap="wrap">
            <Badge variant="light">withinPortal</Badge>
            <Badge variant="default">closeOnEscape</Badge>
            <Badge variant="dot">scroll lock</Badge>
          </Flex>

          <Text color="#b8c5d6">
            W srodku zostawilem ScrollArea, zeby od razu bylo widac, jak komponenty
            zachowuja sie po zagniezdzeniu w overlayu.
          </Text>

          <ScrollArea height="16rem" scrollOffset>
            <Stack gap="sm">
              {activityFeed.map((entry) => (
                <Paper key={`modal-${entry}`} p="sm" radius="lg" shadow="xs">
                  <Text size="sm">{entry}</Text>
                </Paper>
              ))}
            </Stack>
          </ScrollArea>

          <Flex gap="sm" wrap="wrap">
            <Button onClick={() => setModalSize(null)} variant="default">
              Close
            </Button>
            <Button variant="filled">Primary action</Button>
          </Flex>
        </Stack>
      </Modal>

      <Modal
        description="Ten modal jest zamontowany lokalnie przez target=#modal-target."
        lockScroll={false}
        onChange={setTargetedModalOpen}
        opened={targetedModalOpen}
        size="22rem"
        target="#modal-target"
        title="Target modal"
      >
        <Stack gap="md">
          <Text color="#b8c5d6" size="sm">
            To jest przyklad renderowania modala wewnatrz wskazanego kontenera.
          </Text>
          <Button onClick={() => setTargetedModalOpen(false)} variant="filled">
            Close target modal
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default App;
